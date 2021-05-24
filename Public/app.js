console.log('this is');

(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        const covidCols = [
            {
              id: "publicationDate",
              dataType: tableau.dataTypeEnum.date,
            },
            {
              id: "type",
              dataType: tableau.dataTypeEnum.string,
            },
            {
              id: "freq",
              dataType: tableau.dataTypeEnum.string,
            },
            {
              id: "px",
              dataType: tableau.dataTypeEnum.string,
            },
            {
              id: "r",
              dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "rDesc",
                dataType: tableau.dataTypeEnum.string,
            },
            {
              id: "ps",
              dataType: tableau.dataTypeEnum.int,
            },
            {
              id: "TotalRecords",
              dataType: tableau.dataTypeEnum.int,
            },
          ];

          let covidTableSchema = {
            id: "RIVM",
            alias: "Dutch Corona Cases since start",
            columns: covidCols,
          };
      
          schemaCallback([covidTableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
        let tableData = [];
        var i = 0;

        $.getJSON(
      "https://comtrade.un.org/api//refs/da/view?parameters.json",
      function (resp) {
        // Iterate over the JSON object
        for (i = 0, len = resp.length; i < len; i++) {
          tableData.push({
            publicationDate: resp[i].publicationDate,
            type: resp[i].type,
            freq: resp[i].freq,
            px: resp[i].px,
            r: resp[i].r,
            rDesc: resp[i].rDesc,
            ps: resp[i].ps,
            TotalRecords: resp[i].TotalRecords,
          });
        }
        table.appendRows(tableData);
        doneCallback();
        }
        );
    };

    tableau.registerConnector(myConnector);
})();

document.querySelector("#getData").addEventListener("click", getData);

function getData() {
    tableau.connectionName = "Dutch Corona Numbers";
    tableau.submit();
  }