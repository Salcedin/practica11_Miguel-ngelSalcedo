$(document).ready(function() {
    function obtenerAlumnos() {
        $.ajax({
            url: '/alumnos',
            type: 'GET',
            success: function(data) {
                mostrarAlumnos(data);
                mostrarGrafico(data);
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    }

    function mostrarAlumnos(alumnos) {
        var tbody = $('#alumnos-table tbody');
        tbody.empty(); 
        $.each(alumnos, function(index, alumno) {
            var row = '<tr>';
            row += '<td>' + alumno.nombre + '</td>';
            row += '<td>' + alumno.apellidos + '</td>';
            row += '<td>' + alumno.aprobado + '</td>';
            row += '</tr>';
            tbody.append(row);
        });
    }

    function mostrarGrafico(alumnos) {
        var aprobados = contarAlumnosAprobados(alumnos);
        var suspendidos = alumnos.length - aprobados;
        var data = google.visualization.arrayToDataTable([
            ['Estado', 'Cantidad'],
            ['Aprobados', aprobados],
            ['Suspendidos', suspendidos]
        ]);
        var options = {
            title: 'Cantidad de Alumnos Aprobados y Suspendidos'
        };
        var chart = new google.visualization.PieChart(document.getElementById('grafico'));
        chart.draw(data, options);
    }

    function contarAlumnosAprobados(alumnos) {
        var count = 0;
        $.each(alumnos, function(index, alumno) {
            if (alumno.aprobado.toLowerCase() === 'si') {
                count++;
            }
        });
        return count;
    }

    obtenerAlumnos();
});
