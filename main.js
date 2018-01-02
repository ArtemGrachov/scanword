(function () {
    $(document).ready(function () {
        inputFocus();
        buildScanword(scanword);
        activeWord();
    });
    var scanword = {
        width: 6,
        height: 4,
        words: {
            't1': {
                question: 'q1',
                word: 'test',
                answer: [],
                active: true,
                pos: {
                    cell: 0,
                    row: 0
                }
            },
            't2': {
                question: 'q2',
                word: 'testa',
                answer: [],
                active: true,
                pos: {
                    cell: 0,
                    row: 1
                }
            },
            't3': {
                question: 'q3',
                word: 'testb',
                answer: [],
                active: true,
                pos: {
                    cell: 0,
                    row: 2
                }
            },
            't4': {
                question: 'q4',
                word: 'testc',
                answer: [],
                active: true,
                pos: {
                    cell: 0,
                    row: 3
                }
            },
            't5': {
                question: 'q5',
                word: 'abc',
                answer: [],
                active: true,
                pos: {
                    cell: 5,
                    row: 0,
                    vertical: true
                }
            }
        }
    }
    var currentCell = undefined,
        direction = null;
    var inputFocus = function () {
        $('#scanword').on('click', function (e) {
            $('#inp').focus();
        })
        $('#inp').on('keypress', function (e) {
            e.preventDefault();
            inputWord(e.key);
        })
    }
    var inputWord = function (sym) {
        currentCell.text(sym);
        var dataArr = currentCell.data('cell');
        for (var i = 0; i < dataArr.length; i++) {
            var word = scanword.words[dataArr[i].word],
                index = dataArr[i].index,
                answer = word.answer;

            answer[index] = sym;
            if (answer.join('') == word.word) {
                setDone(word)
            }
        }
    }
    var setDone = function (word) {
        word.active = false;
        wordCells(word, function (index, el) {
            el.addClass('done');
        })
    }
    var buildScanword = function () {
        var scanwordEl = $('#scanword');
        scanwordEl.css({
            'width': 3 * scanword.width + 'rem',
            'height': 3 * scanword.height + 'rem'
        })
        var row = 0,
            cell = 0;
        for (var i = 0; i < scanword.width * scanword.height; i++) {
            var cellEl = $('<div class="cell"></div>').appendTo('#scanword');
            cellEl.addClass(row + '-' + cell);
            cell++;
            if (cell >= scanword.width) {
                row++;
                cell = 0;
            }
        }
        var words = scanword.words;
        for (var key in words) {
            var word = words[key];
            var cell = word.pos.cell,
                row = word.pos.row;
            var cellEl = $('.' + row + '-' + cell);
            cellEl.addClass('question');
            cellEl.text(word.question);
            wordCells(word, function (index, el) {
                var data = el.data('cell') ? el.data('cell') : [];
                data.push({
                    word: key,
                    index: index
                });
                el.data('cell', data);
            })
        }
    }
    var wordCells = function (word, callback) {
        var row = word.pos.row,
            cell = word.pos.cell;
        word.pos.vertical ? row++ : cell++;
        for (var i = 0; i < word.word.length; i++) {
            var el = $('.' + (word.pos.vertical ? ((row + i) + '-' + cell) : (row + '-' + (cell + i))));
            callback(i, el);
        }
    }
    var activeWord = function () {
        $('.cell').on('click', function (e) {
            $(this)
                .addClass('active')
                .siblings()
                .removeClass('active');
            currentCell = $(this);
        });
    }
})()