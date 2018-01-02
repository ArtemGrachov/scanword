(function () {
    $(document).ready(function () {
        inputFocus();
        buildScanword(scanword);
        activeWord();
    });
    var scanword = {
        width: 6,
        height: 5,
        words: {
            't1': {
                question: 'q1',
                word: 'test1',
                answer: [],
                active: true,
                pos: {
                    x: 0,
                    y: 0,
                    dir: 'horizontal'
                }
            },
            't2': {
                question: 'q2',
                word: 'test2',
                answer: [],
                active: true,
                pos: {
                    x: 0,
                    y: 1,
                    dir: 'horizontal'
                }
            },
            't3': {

                question: 'q3',
                word: 'test3',
                answer: [],
                active: true,
                pos: {
                    x: 0,
                    y: 2,
                    dir: 'horizontal'
                }
            },
            't4': {
                question: 'q4',
                word: 'test4',
                answer: [],
                active: true,
                pos: {
                    x: 0,
                    y: 3,
                    dir: 'horizontal'
                }
            },
            't5': {
                question: 'q5',
                word: 'test5',
                answer: [],
                active: true,
                pos: {
                    x: 0,
                    y: 4,
                    dir: 'vertical'
                }
            }
        }
    }
    var currentCell = undefined;
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
            var id = dataArr[i].id,
                index = dataArr[i].index,
                answer = scanword[id].answer;
            answer[index] = sym;
            if (answer.join('') == scanword[id].word) {
                scanword[id].active = false;
                $('#' + id).addClass('done');
            }
        }
    }
    var buildScanword = function (scanword) {
        // for (var i in scanword) {
        //     var word = scanword[i].word,
        //         wordEl = $('<div id=' + i + ' class="word' + (scanword[i].pos.dir === 'vertical' ? ' vertical' : '') + '"></div>').appendTo('#scanword');
        //     wordEl.append('<div class="question">' + scanword[i].question + '</div>')
        //     for (var j = 0; j < word.length; j++) {
        //         wordCell = $('<div class="cell"></div>').appendTo(wordEl);
        //         wordCell.data('cell', [{
        //             id: i,
        //             index: j
        //         }])
        //     }
        // }
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

        }
    }
    var activeWord = function () {
        $('.word').on('click', function (e) {
            $(this)
                .addClass('active')
                .siblings()
                .removeClass('active');
            $(e.target)
                .addClass('active')
                .siblings()
                .removeClass('active');
            currentCell = $(e.target);
        });
    }
})()