var array = {};

array['cell_size'] = 10;
array['canvas_width'] = window.innerWidth -
    (window.innerWidth % array['cell_size']) + array['cell_size'];
array['canvas_height'] = window.innerHeight -
    (window.innerHeight % array['cell_size']) + array['cell_size'];

array['interval'] = 200;
array['interval_id'] = null;


function add_canvas() {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canway-canvas');
    canvas.setAttribute('width', array['canvas_width']);
    canvas.setAttribute('height', array['canvas_height']);
    document.body.appendChild(canvas);

    return canvas.getContext('2d');
}

function zeros() {
    var a, i, j, m, n, mat = [];

    m = array['canvas_height'] / array['cell_size'];
    n = array['canvas_width'] / array['cell_size'];

    for (i = 0; i < m; i++) {
        a = [];

        for (j = 0; j < n; j++) {
            a[j] = 0;
        }
        mat[i] = a;
    }
    mat['rows'] = m;
    mat['cols'] = n;

    return mat;
}

function initialize_cells(cells) {
    var i, j;

    for (i = 0; i < cells['rows']; i++) {
        for (j = 0; j < cells['cols']; j++) {
            if (Math.random() > 0.91) {
                cells[i][j] = 1;
            }
        }
    }

    return cells;
}


function draw_cells(context, cells) {
    var i, j, x, y;

    for (i = 0; i < cells['rows']; i++) {
        for (j = 0; j < cells['cols']; j++) {
            if (cells[i][j] === 1) {
                context.fillStyle = 'green';
            } else {
                context.fillStyle = '#a5a5a5';
            }

            from_top = i * array['cell_size'];
            from_left = j * array['cell_size'];
            context.fillRect(from_left, from_top,
                             array['cell_size'], array['cell_size']);
        }
    }
}

function copy_cells(source, dest) {
    for (let i = 0; i < source['rows']; i++) {
        for (let j = 0; j < source['cols']; j++) {
            dest[i][j] = source[i][j];
        }
    }

    return dest;
}

function update(cells) {
    var i, j, k, l;
    var old, cnt;
    var col_min, col_max, row_min, row_max;

    old = copy_cells(cells, zeros());
    for (i = 0; i < cells['rows']; i++) {
        for (j = 0; j < cells['cols']; j++) {
            cnt = 0;

          /*  if(old[Math.min(i+1,cells['rows'])][j]===1)
              cnt++;
            if(old[i][Math.min(j+1,cells['cols'])]===1)
              cnt++;
            if(old[Math.max(0,i-1)][j]===1)
              cnt++;
            if(old[i][Math.max(0,j-1)]===1)
              cnt++;
            if(old[Math.min(i+1,cells['rows'])][Math.min(j+1,cells['cols'])]===1)
              cnt++;
            if(old[Math.min(i+1,cells['rows'])][Math.max(0,j-1)]===1)
              cnt++;
            if(old[Math.max(0,i-1)][Math.min(j+1,cells['cols'])]===1)
              cnt++;
            if(old[Math.max(0,i-1)][Math.max(0,j-1)]===1)
              cnt++;*/
              row_min = Math.max(0, i - 1);
              row_max = Math.min(cells['rows'], i + 2);
              col_min = Math.max(0, j - 1);
              col_max = Math.min(cells['cols'], j + 2);

              for (k = row_min; k < row_max; k++) {
                  for (l = col_min; l < col_max; l++) {
                      if (old[k][l] === 1) {
                          cnt++;
                      }
                  }
              }
            if(old[i][j]===1)
              cnt--;
            if(old[i][j]===1){
              if (cnt !== 2 && cnt !== 3) {
                cells[i][j] = 0;
            }
            } else {
                // dead cell comes back to life
                if (cnt === 3) {
                    cells[i][j] = 1;
                }
            }
        }
    }

    return cells;
}


function init_sim() {
    array['cells'] = initialize_cells(zeros());
}


function run_sim() {
    var cells = array['cells'];
    var context = array['context'];

    update(cells);
    draw_cells(context, cells);
}



window.onload = function () {
    array['context'] = add_canvas();

    init_sim();
    array['interval_id'] = window.setInterval(run_sim, array['interval']);


};
