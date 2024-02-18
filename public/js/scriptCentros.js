$(document).ready(function() {
    $.ajax({
        url: "/centros",
        type: "GET",
        success: function(response) {
            var centros = response;
            var centrosListHTML = "<div class='cards-container'>";
            $.each(centros, function(index, centro) {
                centrosListHTML += "<div class='card centro-card'>" +
                                    "<h2>" + centro.nombre + "</h2>" +
                                    "<p><strong>Ciudad:</strong> " + centro.ciudad + "</p>" +
                                  "</div>";
            });
            centrosListHTML += "</div>";
            $("#centros-list").html(centrosListHTML);
        },
        error: function(xhr, status, error) {
            console.error("Error al obtener la lista de centros:", error);
        }
    });
});
