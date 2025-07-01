from django.http import JsonResponse
import xmlrpc.client
from django.shortcuts import render

# Informations Odoo
ODOO_URL = 'http://102.215.95.245:8069'
ODOO_DB = 'oddo_db'
ODOO_USER = 'commercial@a2ict.com'
ODOO_PASSWORD = 'admin'

def connect_to_odoo(request):
    """Connexion à Odoo et vérification de l'authentification."""
    try:
        common = xmlrpc.client.ServerProxy(f"{ODOO_URL}/xmlrpc/2/common")
        uid = common.authenticate(ODOO_DB, ODOO_USER, ODOO_PASSWORD, {})

        if uid:
            return JsonResponse({"message": "Connexion réussie à Odoo !", "uid": uid})
        else:
            return JsonResponse({"error": "Échec de l'authentification à Odoo"}, status=500)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

def get_products(request):
    """Récupération des produits avec images et stock uniquement."""
    try:
        # Connexion à Odoo
        common = xmlrpc.client.ServerProxy(f"{ODOO_URL}/xmlrpc/2/common")
        uid = common.authenticate(ODOO_DB, ODOO_USER, ODOO_PASSWORD, {})

        if not uid:
            return JsonResponse({"error": "Échec de l'authentification"}, status=500)

        models = xmlrpc.client.ServerProxy(f"{ODOO_URL}/xmlrpc/2/object")

        # Récupération des produits
        products = models.execute_kw(
            ODOO_DB, uid, ODOO_PASSWORD,
            'product.product', 'search_read',
            [[['sale_ok', '=', True]]],
            {'fields': ['id', 'name', 'list_price', 'product_tmpl_id', 'description_sale', 'categ_id'],'limit':500}
        )

        if not products:
            return JsonResponse([], safe=False)

        # Traitement des IDs
        for product in products:
            if isinstance(product.get('product_tmpl_id'), list):
                product['product_tmpl_id'] = product['product_tmpl_id'][0]
            
            if isinstance(product.get('categ_id'), list):
                product['categ_id'] = product['categ_id'][1]

        # Récupération des images
        product_template_ids = [p['product_tmpl_id'] for p in products if 'product_tmpl_id' in p]

        if product_template_ids:
            templates = models.execute_kw(
                ODOO_DB, uid, ODOO_PASSWORD,
                'product.template', 'search_read',
                [[['id', 'in', product_template_ids]]],
                {'fields': ['id', 'image_1920']}
            )

            # Associer les images
            template_images = {t['id']: t['image_1920'] for t in templates}
            for product in products:
                product['image_1920'] = template_images.get(product.get('product_tmpl_id'))

        # Suppression des produits sans image
        products = [p for p in products if p.get('image_1920')]

        # Récupération des stocks
        product_ids = [p['id'] for p in products if 'id' in p]

        if product_ids:
            stock_quantities = models.execute_kw(
                ODOO_DB, uid, ODOO_PASSWORD,
                'stock.quant', 'search_read',
                [[['product_id', 'in', product_ids]]],
                {'fields': ['product_id', 'quantity']}
            )

            # Associer les stocks
            stock_dict = {q['product_id'][0]: q.get('quantity', 0) for q in stock_quantities if 'product_id' in q}
            for product in products:
                product['quantity'] = stock_dict.get(product['id'], 0)

            # Suppression des produits sans stock
            products = [p for p in products if p.get('quantity', 0) > 0]

        return JsonResponse(products, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)