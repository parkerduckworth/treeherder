from django.conf import settings
from django.conf.urls import (include,
                              url)
from django.views.decorators.csrf import csrf_exempt
from rest_framework_swagger.views import get_swagger_view

from treeherder.webapp.api import urls as api_urls

urlpatterns = [
   url(r'^api/', include(api_urls)),
   url(r'^docs/', get_swagger_view(title='Treeherder API')),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]

if settings.GRAPHQL:
    from graphene_django.views import GraphQLView
    from treeherder.webapp.graphql.schema import schema
    urlpatterns += [
        url(r'^graphql$',
            csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema)),
            name='graphql'),
    ]
