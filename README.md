# Proyecto: Lista de Películas con Búsqueda y Favoritos

## Descripción
- Crea una aplicación web que consuma la API de TMDb para mostrar películas populares. El usuario podrá buscar películas por título, ver detalles básicos y marcar películas como favoritas, que se guardarán en localStorage para persistencia.

## Requisitos funcionales

- Carga inicial:
    Al abrir la app, mostrar las películas populares obtenidas de la API.

- Búsqueda:
    Un campo de búsqueda permite filtrar películas por título en tiempo real con debounce para no saturar la API.

- Mostrar película:
    -- Para cada película se muestra:
        --- Imagen (carátula)
        ✅ Título
        --- Año de estreno
        --- Rating (valor numérico)

- Favoritos:

    -- Cada película tiene un botón para agregar o quitar de favoritos.
    -- La lista de favoritos se guarda en localStorage.
    -- Se muestra una sección con las películas favoritas, actualizada en tiempo real.