from django.db import models

# Create your models here.


class TipoTraduccion(models.Model):
    nombre = models.CharField(max_length=10)

    def __str__(self) -> str:
        return self.nombre

    class Meta:
        verbose_name = 'TipoTraduccion'
        verbose_name_plural = 'TiposTraducciones'
        db_table = 'tipotraduccion'


class Traduccion(models.Model):
    texto = models.TextField()
    texto_traducido = models.TextField()
    tipo_traduccion = models.ForeignKey(TipoTraduccion, null=False, blank=False, on_delete=models.CASCADE)
    estado = models.BooleanField(default=True)

    def __str__(self) -> str:
        return "{} | {}".format(self.texto, self.texto_traducido)

    class Meta:
        verbose_name = 'Traduccion'
        verbose_name_plural = 'Traducciones'
        db_table = 'traduccion'
