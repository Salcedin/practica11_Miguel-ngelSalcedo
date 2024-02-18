$(document).ready(function() {
    $.ajax({
        url: "/cursos",
        type: "GET",
        success: function(response) {
            var cursos = response;
            var cursosListHTML = "<div class='cards-container'>";
            $.each(cursos, function(index, curso) {
                cursosListHTML += "<div class='card curso-card'>" +
                                    "<h2>" + curso.nombre + "</h2>" +
                                    "<p><strong>Nivel:</strong> " + curso.nivel + "</p>" +
                                    "<p><strong>Descripción:</strong> " + curso.descripcion + "</p>" +
                                  "</div>";
            });
            cursosListHTML += "</div>";
            $("#cursos-list").html(cursosListHTML);

        },
        error: function(xhr, status, error) {
            console.error("Error al obtener la lista de cursos:", error);
        }
    });
});
