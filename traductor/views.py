from django.http.response import JsonResponse
from django.shortcuts import render
from .models import Traduccion

# Create your views here.


def index(request):
    return render(request, 'index.html')


def buscar_traduccion(_request, tipo_traduccion_id, texto_buscar):

    if tipo_traduccion_id == 3:
        traducciones = list(Traduccion.objects
                            .filter(texto__contains=texto_buscar)
                            .order_by('texto')
                            .prefetch_related('tipo_traduccion')
                            .values('texto', 'texto_traducido', 'tipo_traduccion__nombre'))
    else:
        traducciones = list(Traduccion.objects
                            .filter(texto__contains=texto_buscar)
                            .filter(tipo_traduccion__id=tipo_traduccion_id)
                            .order_by('texto')
                            .prefetch_related('tipo_traduccion')
                            .values('texto', 'texto_traducido', 'tipo_traduccion__nombre'))

    data = {
        'mensaje': "exito" if (len(traducciones) > 0) else "noencontradas",
        'traducciones': traducciones
    }
    return JsonResponse(data)
