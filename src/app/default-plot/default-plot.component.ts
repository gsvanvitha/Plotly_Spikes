import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Plotly from 'plotly.js-dist';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-default-plot',
  templateUrl: './default-plot.component.html',
  styleUrls: ['./default-plot.component.css'],
})
export class DefaultPlotComponent implements OnInit {
  constructor(private http: HttpClient) {}
  @ViewChild('plotDateDefault', { static: true }) plotDefault: ElementRef;
  @ViewChild('plotDateCustom', { static: true }) plotCustom: ElementRef;
  @ViewChild('plotHttp', { static: true }) plotHttp: ElementRef;
  @ViewChild('plotTrace', { static: true }) plotTrace: ElementRef;
  public values = [];
  public reqPlot;
  public originalDiff;
  public currentDiff;
  public customPlot;
  public trace3;
  public data;
  public layout;
  ngOnInit(): void {
    d3.csv('assets/ExportData1x.csv').then((rows) => {
      function unpack(rows, key) {
        return rows.map(function (row) {
          return row[key];
        });
      }
      var trace1 = {
        type: 'scatter',
        mode: 'lines',
        name: 'Trace 1',
        x: unpack(rows, 'X-Axis Value'),
        y: unpack(rows, 'Y-Axis Value'),
        line: { color: 'grey' },
        hoverlabel: {
          bgcolor: 'blue',
          font: {
            color: 'yellow',
            family: 'Times New Roman',
            size: 16,
          },
          bordercolor: 'green',
          opacity: 0,
        },
      };
      var trace2 = {
        type: 'scatter',
        mode: 'lines',
        name: 'Trace 2',
        x: unpack(rows, 'X-Axis Value'),
        y: unpack(rows, 'Y-Axis 2 Value'),
        line: { color: 'green' },
        //yaxis: 'y2',
        hoverlabel: {
          bgcolor: 'black',
          font: {
            color: 'yellow',
            family: 'Courier New, monospace',
            size: 16,
          },
          bordercolor: 'yellow',
        },
      };
      var data = [trace1, trace2];
      var layout = {
        hovermode: 'x',
        xaxis: {
          tickformat: '%d %b %y<br> %_I:%M:%S %p',
          // range: ['2021-09-14 05:37', '2021-09-14 05:40'],
          //type: 'date',
          showspikes: true,
          spikemode: 'across',
        },
        yaxis: {
          // side: 'right',
          //overlaying: 'y',
          showspikes: true,
          spikemode: 'toaxis+marker',
        },
        shapes: [
          {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 0.7,
            x1: 1,
            y1: 0.7,
            line: {
              color: 'red',
              width: 1.5,
            },
          },
          {
            type: 'path',
            path: 'M 0.25 0.65 L 0 0.7 L 0.5 0.7 Z',
            fillcolor: 'rgba(160, 0, 0, 0.5)',
            line: {
              color: 'rgb(160, 0, 0)',
            },
          },
          {
            type: 'path',
            path: 'M 29.50 0.65 L 29.25 0.7 L 29.75 0.7 Z',
            fillcolor: 'rgba(160, 0, 0, 0.5)',
            line: {
              color: 'rgb(160, 0, 0)',
            },
          },
        ],

        grid: {
          // rows: 2,
          // columns: 1,
          // roworder: 'top to bottom',
          // subplots: [['xy'], ['xy2']],
        },
      };

      // Plotly.newPlot(this.plotDefault.nativeElement, data, layout, {
      //   scrollZoom: false,
      //   modeBarButtonsToAdd: [
      //     'v1hovermode',
      //     {
      //       name: 'CustomButton',
      //       icon: Plotly.Icons.pencil,
      //       click: (gd) => {
      //         var update = {
      //           // xaxis: {
      //           //   fixedrange: true,
      //           // },
      //         };
      //         Plotly.relayout(gd, update);
      //       },
      //     },
      //   ],
      // });
    });
    this.http
      .get('assets/CustomDate.JSON', { responseType: 'json' })

      .subscribe(
        (rows) => {
          function unpack(rows, key) {
            return rows.map(function (row) {
              return row[key];
            });
          }
          var trace1 = {
            type: 'scatter',
            mode: 'lines',
            name: 'Trace 1',
            x: unpack(rows, 'X-Axis Value'),
            y: unpack(rows, 'Y-Axis Value'),
            line: { color: 'grey' },
          };
          var trace2 = {
            type: 'scatter',
            mode: 'lines',
            name: 'Trace 2',
            x: unpack(rows, 'X-Axis Value'),
            y: unpack(rows, 'Y-Axis 2 Value'),
            line: { color: 'green' },
          };
          var trace3 = {
            type: 'scatter',
            mode: 'markers+lines',
            name: '<b>Set Point Line</b><br>Value : 0.7',
            x: ['2021-09-14 05:33:06', '2021-09-14 06:06:53'],
            y: [0.7, 0.7],
            marker: { size: 12, symbol: 'triangle-up', color: 'red' },
            line: { color: 'transparent', width: 1 },
            showlegend: false,
          };
          var data = [trace1, trace2, trace3];
          var layout = {
            shapes: [
              {
                type: 'line',
                xref: 'paper',
                x0: 0,
                y0: 0.7,
                x1: 1,
                y1: 0.7,
                line: {
                  color: 'red',
                  width: 1.5,
                },
              },
            ],
            xaxis: {
              // tickformat: '%d %b %y<br> %_I:%M:%S %p',
              range: ['2021-09-14 05:33:06', '2021-09-14 06:06:53'],
              type: 'date',
            },
            legend: {
              orientation: 'h',
              x: 0.4,
              y: -0.4,
              bordercolor: 'black',
              borderwidth: 1,
              borderpad: 4,
            },
            hovermode: 'x',
          };

          // this.reqPlot = Plotly.newPlot(
          //   this.plotHttp.nativeElement,
          //   data,
          //   layout,
          //   {
          //     scrollZoom: false,
          //     modeBarButtonsToRemove: [
          //       'toImage',
          //       'select2d',
          //       'lasso2d',
          //       'autoscale',
          //     ],
          //     modeBarButtonsToAdd: [
          //       'v1hovermode',

          //       {
          //         name: 'Undo-Zoom/Pan',
          //         icon: Plotly.Icons.undo,
          //         click: (gd) => {
          //           console.log(this.values);
          //           var update = {};
          //           if (this.values.length > 1) {
          //             this.values.pop();
          //             var index = this.values.length - 1;
          //             update = {
          //               xaxis: {
          //                 range: [
          //                   this.values[index].xaxis1,
          //                   this.values[index].xaxis2,
          //                 ],
          //               },
          //               yaxis: {
          //                 range: [
          //                   this.values[index].yaxis1,
          //                   this.values[index].yaxis2,
          //                 ],
          //               },
          //             };
          //           }
          //           Plotly.relayout(gd, update);
          //         },
          //       },
          //     ],
          //     displaylogo: false,
          //   }
          // );
        },

        (error) => {
          console.log(error);
        }
      );
    this.http
      .get('assets/CustomDate.JSON', { responseType: 'json' })

      .subscribe(
        (rows) => {
          function unpack(rows, key) {
            return rows.map(function (row) {
              return row[key];
            });
          }
          var trace1 = {
            type: 'scatter',
            mode: 'lines',
            //   name: 'Trace 1',
            x: unpack(rows, 'X-Axis Value'),
            y: unpack(rows, 'Y-Axis Value'),
            line: { color: 'grey' },
          };
          var trace2 = {
            type: 'scatter',
            mode: 'lines',
            //   name: 'Trace 2',
            x: unpack(rows, 'X-Axis Value'),
            y: unpack(rows, 'Y-Axis 2 Value'),
            line: { color: 'green' },
          };
          var trace3 = {
            type: 'scatter',
            mode: 'markers+lines',
            // name: '<b>Set Point Line</b><br>Value : 0.7',
            x: ['2021-09-14 05:33:26', '2021-09-14 06:06:33'],
            y: [0.7, 0.7],
            text: ['🔻', '🔻'],
            marker: { size: 12, symbol: 'triangle-up', color: 'blue' },
            line: { color: 'red', width: 1 },
            showlegend: false,
            hovertemplate:
              '<b>Set Point Line</b><br>Value : 0.7<extra></extra>',
          };
          var trace4 = {
            type: 'scatter',
            mode: 'markers+lines',
            // name: '<b>Set Point Line</b><br>Value : 0.7',
            x: ['2021-09-14 05:33:26', '2021-09-14 06:06:33'],
            y: [0.4, 0.4],
            text: ['🔻', '🔻'],
            marker: { size: 12, symbol: 'triangle-down', color: 'orange' },
            line: { color: 'red', width: 1 },
            showlegend: false,
            hovertemplate:
              '<b>Set Point Line</b><br>Value : 0.7<extra></extra>',
          };

          var data = [trace1, trace2, trace3, trace4];
          var layout = {
            hoverdistance: 5,
            xaxis: {
              // tickformat: '%d %b %y<br> %_I:%M:%S %p',
              range: ['2021-09-14 05:33:06', '2021-09-14 06:06:53'],
              type: 'date',
              nticks: 7,
            },
            legend: {
              orientation: 'h',
              x: 0.4,
              y: -0.4,
              bordercolor: 'black',
              borderwidth: 1,
              borderpad: 4,
            },
            hovermode: 'x',
          };

          this.reqPlot = Plotly.newPlot(
            this.plotTrace.nativeElement,
            data,
            layout,

            { modeBarButtonsToAdd: ['v1hovermode'] }
          );
        },

        (error) => {
          console.log(error);
        }
      );
    d3.csv('assets/CustomDate.csv').then((rows) => {
      function unpack(rows, key) {
        return rows.map(function (row) {
          return row[key];
        });
      }
      var trace1 = {
        type: 'scatter',
        name: 'Trace 1',
        x: unpack(rows, 'X-Axis Value'),
        y: unpack(rows, 'Y-Axis Value'),
        line: { color: 'black' },
      };
      var trace2 = {
        type: 'scatter',
        name: 'Trace 2',
        x: unpack(rows, 'X-Axis Value'),
        y: unpack(rows, 'Y-Axis 2 Value'),
        line: { color: 'green' },
      };

      this.trace3 = {
        type: 'scatter',
        mode: 'text+lines',
        name: '<b>Set Point Line</b><br>Value : 0.7',
        x: [
          '2021-09-14 05:35',
          '2021-09-14 06:05',
          '2021-09-14 06:05',
          '2021-09-14 05:35',
        ],
        y: [0.7, 0.7, 0.704, 0.704],
        text: ['🔻', '🔻', ,],
        line: { color: 'red', width: 1 },
        hoveron: 'fills',
        fill: 'toself',
        fillcolor: 'red',
        showlegend: false,
        hovertemplate: ' <extra> </extra>',
        hoverlabel: {
          bgcolor: 'black',
          font: {
            color: 'yellow',
            family: 'Times New Roman',
            size: 16,
          },
          bordercolor: 'green',
          opacity: 0,
        },
      };
      this.data = [trace1, trace2, this.trace3];
      this.layout = {
        hovermode: 'closest',
        xaxis: {
          //tickformat: '%d %b %y<br> %_I:%M:%S %p',
          // tickformat: '%a %e %b \n %Y',

          type: 'date',
          range: ['2021-09-14 05:35', '2021-09-14 06:05'],
          // fixedrange: true,
        },
        yaxis: {
          range: [0.2, 1],
          // fixedrange: true,
        },
        modebar: {
          color: 'white',
          activecolor: 'yellow',
          bgcolor: 'black',
          orientation: 'v',
        },
      };
      // this.customPlot = Plotly.newPlot(
      //   this.plotCustom.nativeElement,
      //   this.data,
      //   this.layout,
      //   {
      //     modeBarButtonsToAdd: ['v1hovermode'],
      //   }
      // );
    });
  }
  calcMinDate(currDiff) {
    if (currDiff < 100) return 0;
    return (30000 * currDiff) / this.originalDiff;
  }
  calcMaxDate(currDiff) {
    //  if (currDiff < 32000 && currDiff > 15000) return 0.000000009 * currDiff;
    //  if (currDiff < 15000) return 0.00001 * currDiff;
    if (currDiff < 100) return 0;
    return (20000 * currDiff) / this.originalDiff;
  }
  ngAfterViewInit() {
    console.log('after');
    setTimeout(() => {
      // this.values.push({
      //   xaxis1: this.reqPlot.__zone_symbol__value.layout.xaxis.range[0],
      //   xaxis2: this.reqPlot.__zone_symbol__value.layout.xaxis.range[1],
      //   yaxis1: this.reqPlot.__zone_symbol__value.layout.yaxis.range[0],
      //   yaxis2: this.reqPlot.__zone_symbol__value.layout.yaxis.range[1],
      // });
      // console.log(this.values);
      // this.plotHttp.nativeElement.on('plotly_relayout', (data) => {
      //   if (data['xaxis.range[0]'] != null && data['yaxis.range[0]'] != null) {
      //     this.values.push({
      //       xaxis1: data['xaxis.range[0]'],
      //       xaxis2: data['xaxis.range[1]'],
      //       yaxis1: data['yaxis.range[0]'],
      //       yaxis2: data['yaxis.range[1]'],
      //     });
      //   } else if (
      //     data['xaxis.range[0]'] == null &&
      //     data['yaxis.range[0]'] != null
      //   ) {
      //     this.values.push({
      //       xaxis1: this.values[this.values.length - 1].xaxis1,
      //       xaxis2: this.values[this.values.length - 1].xaxis2,
      //       yaxis1: data['yaxis.range[0]'],
      //       yaxis2: data['yaxis.range[1]'],
      //     });
      //   } else if (
      //     data['yaxis.range[0]'] == null &&
      //     data['xaxis.range[0]'] != null
      //   ) {
      //     this.values.push({
      //       xaxis1: data['xaxis.range[0]'],
      //       xaxis2: data['xaxis.range[1]'],
      //       yaxis1: this.values[this.values.length - 1].yaxis1,
      //       yaxis2: this.values[this.values.length - 1].yaxis2,
      //     });
      //   }
      // });
      // var y0 = this.customPlot.__zone_symbol__value.layout.yaxis.range[0];
      // var y1 = this.customPlot.__zone_symbol__value.layout.yaxis.range[1];
      // this.originalDiff = y1 - y0;
      // this.plotCustom.nativeElement.on('plotly_relayout', (data) => {
      //   console.log(data);
      //   if (data['dragmode'] == 'zoom' || data['dragmode'] == 'pan') {
      //   } else {
      //     var newSetPointLine;
      //     if (
      //       data['xaxis.autorange'] == true &&
      //       data['yaxis.autorange'] == true
      //     ) {
      //       newSetPointLine = 0.004;
      //     } else {
      //       this.currentDiff = data['yaxis.range[1]'] - data['yaxis.range[0]'];
      //       newSetPointLine = (0.004 * this.currentDiff) / this.originalDiff;
      //     }
      //     // if (
      //     //   data['xaxis.range[0]'] == '2021-09-14 05:35' &&
      //     //   data['xaxis.range[1]'] == '2021-09-14 06:05'
      //     // )
      //     //   newSetPointLine = 0.004;

      //     var update = {
      //       y: [[0.7, 0.7, 0.7 + newSetPointLine, 0.7 + newSetPointLine]],
      //       x: [
      //         [
      //           this.customPlot.__zone_symbol__value.layout.xaxis.range[0],
      //           this.customPlot.__zone_symbol__value.layout.xaxis.range[1],
      //           this.customPlot.__zone_symbol__value.layout.xaxis.range[1],
      //           this.customPlot.__zone_symbol__value.layout.xaxis.range[0],
      //         ],
      //       ],
      //     };
      //     Plotly.restyle(this.plotCustom.nativeElement, update, [2]);
      //     console.log(
      //       this.customPlot.__zone_symbol__value.layout.xaxis.range[0]
      //     );
      //     // Plotly.update(this.plotCustom.nativeElement, update, 0);
      //     // this.trace3.y = [
      //     //   0.7,
      //     //   0.7,
      //     //   0.7 + newSetPointLine,
      //     //   0.7 + newSetPointLine,
      //     // ];

      //     // Plotly.react(this.plotCustom.nativeElement, this.data, this.layout);
      //   }
      // });
      this.originalDiff =
        new Date(
          this.reqPlot.__zone_symbol__value.layout.xaxis.range[1]
        ).getTime() -
        new Date(
          this.reqPlot.__zone_symbol__value.layout.xaxis.range[0]
        ).getTime();

      this.plotTrace.nativeElement.on('plotly_relayout', (data) => {
        console.log(data);
        console.log(this);
        var update = {};
        if (
          this.reqPlot.__zone_symbol__value.layout.xaxis.range[0] <
            '2021-09-14 05:33:06' &&
          this.reqPlot.__zone_symbol__value.layout.xaxis.range[1] >
            '2021-09-14 06:06:53'
        ) {
          update = {
            x: [['2021-09-14 05:33:06', '2021-09-14 06:06:53']],
          };
        } else {
          var currDiff =
            new Date(
              this.reqPlot.__zone_symbol__value.layout.xaxis.range[1]
            ).getTime() -
            new Date(
              this.reqPlot.__zone_symbol__value.layout.xaxis.range[0]
            ).getTime();
          console.log(currDiff);
          var minDateDiff = this.calcMinDate(currDiff);
          var maxDateDiff = this.calcMaxDate(currDiff);
          console.log(maxDateDiff);
          // console.log(
          //   new Date(
          //     this.reqPlot.__zone_symbol__value.layout.xaxis.range[1]
          //   ).getTime() - maxDateDiff
          // );
          var minDate = new Date(
            this.reqPlot.__zone_symbol__value.layout.xaxis.range[0]
          ).setTime(
            new Date(
              this.reqPlot.__zone_symbol__value.layout.xaxis.range[0]
            ).getTime() + minDateDiff
          );
          var maxDate = new Date(
            this.reqPlot.__zone_symbol__value.layout.xaxis.range[1]
          ).setTime(
            new Date(
              this.reqPlot.__zone_symbol__value.layout.xaxis.range[1]
            ).getTime() - maxDateDiff
          );
          update = {
            x: [[minDate, maxDate]],
          };
          if (maxDateDiff == 0 && minDateDiff == 0) {
            update = {
              x: [
                [
                  this.reqPlot.__zone_symbol__value.layout.xaxis.range[0],
                  this.reqPlot.__zone_symbol__value.layout.xaxis.range[1],
                ],
              ],
            };
          }
        }

        Plotly.restyle(this.plotTrace.nativeElement, update, [2, 3]);
      });
    }, 1000);
  }
}
