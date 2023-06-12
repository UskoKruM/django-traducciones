from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('buscar_traduccion/<int:tipo_traduccion_id>/<texto_buscar>', views.buscar_traduccion, name='buscar_traduccion')
]
