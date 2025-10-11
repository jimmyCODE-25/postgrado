from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from graphene_django.views import GraphQLView
from .schema import schema

@method_decorator(csrf_exempt, name="dispatch")
class ExemptGraphQLView(GraphQLView):
    schema = schema


urlpatterns = [
    path("graphql/", ExemptGraphQLView.as_view(graphiql=True)),
]
