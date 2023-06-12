let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3] },
        { orderable: false, targets: [0] },
        { searchable: false, targets: [1, 2, 3] }
    ],
    pageLength: 10,
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ traducciones por página",
        zeroRecords: "Ninguna traducción encontrada",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ traducciones",
        infoEmpty: "Ninguna traducción encontrada",
        infoFiltered: "(filtrados desde _MAX_ traducciones totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
};

const initDataTable = async (texto) => {
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await buscarTraduccion(texto);

    dataTable = $("#datatable-traducciones").DataTable(dataTableOptions);

    dataTableIsInitialized = true;
};

const createTagWithOptions = (tagName, options) => {
    return Object.assign(document.createElement(tagName), options);
};

const buscarTraduccion = async (texto) => {
    const tipoTraduccionId = document.getElementById("cboTipoTraduccion").value;

    try {
        const response = await fetch(`${window.origin}/traductor/buscar_traduccion/${tipoTraduccionId}/${texto}`);
        const data = await response.json();

        if (data.mensaje === "exito") {
            document.getElementById("tableBody_Traducciones").innerHTML = ``;
            
            data.traducciones.forEach((traduccion, index) => {
                const tr = document.createElement("tr");

                tr.appendChild(createTagWithOptions("td", { innerText: index + 1 }));
                tr.appendChild(createTagWithOptions("td", { innerText: traduccion.tipo_traduccion__nombre }));
                tr.appendChild(createTagWithOptions("td", { innerText: traduccion.texto }));
                tr.appendChild(createTagWithOptions("td", { innerText: traduccion.texto_traducido }));

                document.getElementById("tableBody_Traducciones").appendChild(tr);
            });
        } else if (data.mensaje === "noencontradas") {
            document.getElementById("tableBody_Traducciones").innerHTML = ``;
        } else {
            alert("Ocurrió un error...");
        }
    } catch (ex) {
        alert("Ocurrió un error...");
    }
};

const validateInput = () => {
    const texto = String(txtTexto.value).trim();
    return texto.length > 0;
};

const initialLoad = () => {
    frmBusquedaTraduccion.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (validateInput()) {
            await initDataTable(String(txtTexto.value).trim());
        }
    });
};

window.addEventListener("load", () => {
    initialLoad();
});
