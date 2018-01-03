(function () {
    $(document).ready(function () {
        inputFocus();
        buildScanword(scanword);
        activeWord();
    });
    const Scanword = function (words) {
        this.words = words;
    }
    const Word = function (question, word, pos) {
        this.question = question;
        this.word = word;
        this.pos = pos;
        this.answer = [];
        this.active = true;
    }
    const scanword0 = {
        width: 6,
        height: 4,
        words: {
            't1': {
                question: 'q1',
                word: 'te',
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
            },
            't6': {
                question: 't6',
                word: 'e',
                answer: [],
                active: true,
                pos: {
                    cell: 3,
                    row: 1,
                    vertical: true
                },
                origin: {
                    cell: 4,
                    row: 0
                }
            }
        }
    }
    const scanword = scanword0;
    let currentCell = undefined,
        currentWord = undefined;
    let inputFocus = function () {
        $('#scanword').on('click', function (e) {
            $('#inp').focus();
        })
        $('#inp').on('keypress', function (e) {
            e.preventDefault();
            if (currentCell) inputWord(e.key);
        })
        $('#inp').on('keydown', function (e) {
            if (currentCell) {
                switch (e.keyCode) {
                    case 8:
                    case 46:
                        if (!currentCell.hasClass('done')) {
                            if (e.keyCode == 8 && currentCell.text() == '') {
                                toggleCell('prev');
                            }
                            var cellData = currentCell.data('cell');
                            for (let key in cellData) {
                                const data = cellData[key];
                                data.word.answer[data.index] = null;
                            }
                            currentCell.text('')
                        }
                        break;
                    case 9:
                        e.preventDefault();
                        toggleDir(currentCell.data('cell'));
                        break;
                    case 35:
                        toggleCell('last');
                        break;
                    case 36:
                        toggleCell('first');
                        break;
                    case 37:
                        if (currentWord.pos.vertical) {
                            console.log('left')
                        } else {
                            toggleCell('prev')
                        }
                        break;
                    case 38:
                        if (currentWord.pos.vertical) {
                            toggleCell('prev')
                        } else {
                            console.log('up')
                        }
                        break;
                    case 39:
                        if (currentWord.pos.vertical) {
                            console.log('right')
                        } else {
                            toggleCell('next')
                        }
                        break;
                    case 40:
                        if (currentWord.pos.vertical) {
                            toggleCell('next')
                        } else {
                            console.log('down')
                        }
                        break;
                }
            }
        })
    }
    let inputWord = function (sym) {
        if (!currentCell.hasClass('done')) {
            currentCell.text(sym);
            let data = currentCell.data('cell');
            for (let key in data) {
                let wordObj = data[key].word,
                    answer = data[key].word.answer,
                    index = data[key].index;
                answer[index] = sym;
                if (answer.join('').toLowerCase() == wordObj.word) {
                    setDone(wordObj);
                }
            }
            if (currentCell) toggleCell('next');
        }
    }
    let setDone = function (wordObj) {
        wordObj.active = false;
        wordCells(wordObj, function (index, el) {
            el.addClass('done');
        })
    }
    let buildScanword = function () {
        let scanwordEl = $('#scanword');
        scanwordEl.css({
            'width': 3 * scanword.width + 'rem',
            'height': 3 * scanword.height + 'rem'
        })
        let row = 0,
            cell = 0;
        for (let i = 0; i < scanword.width * scanword.height; i++) {
            let cellEl = $('<a href="#" class="cell"></a>').appendTo('#scanword');
            cellEl.addClass('pos-' + row + '-' + cell);
            cell++;
            if (cell >= scanword.width) {
                row++;
                cell = 0;
            }
        }
        let words = scanword.words;
        for (let key in words) {
            let word = words[key];
            let cell = word.pos.cell,
                row = word.pos.row;
            let cellEl = $('.pos-' + row + '-' + cell);
            cellEl.attr('class', 'question');
            if (word.origin) {
                const origin = word.origin,
                    pos = word.pos;
                if (origin.cell > pos.cell) {
                    cellEl.addClass('arrow-right');
                } else if (origin.cell < pos.cell) {
                    cellEl.addClass('arrow-left');
                }
                if (origin.row > pos.row) {
                    cellEl.addClass('arrow-bottom');
                } else if (origin.row < pos.row) {
                    cellEl.addClass('arrow-top');
                }
                if (word.pos.vertical) {
                    cellEl.addClass('arrow-vertical');
                } else {
                    cellEl.addClass('arrow-horizontal');
                }
            } else {
                if (word.pos.vertical) {
                    cellEl.addClass('arrow-bottom arrow-to-bottom');
                } else {
                    cellEl.addClass('arrow-right');
                }
            }

            cellEl.text(word.question + '|' + word.word);
            wordCells(word, function (index, el) {
                let data = el.data('cell') ? el.data('cell') : {};
                if (word.pos.vertical) {
                    data.vertical = {
                        word: word,
                        index: index
                    }
                } else {
                    data.horizontal = {
                        word: word,
                        index: index
                    }
                }
                el.data('cell', data);
            })
        }
    }
    let wordCells = function (word, callback) {
        let row, cell;
        if (word.origin) {
            row = word.origin.row;
            cell = word.origin.cell;
        } else {
            row = word.pos.row;
            cell = word.pos.cell;
            word.pos.vertical ? row++ : cell++;
        }
        for (let i = 0; i < word.word.length; i++) {
            let el = $('.pos-' + (word.pos.vertical ? ((row + i) + '-' + cell) : (row + '-' + (cell + i))));
            callback(i, el);
        }
    }
    let toggleCell = function (dir) {
        if (currentWord) {
            let pos = currentCell.attr('class').split(' ').filter(
                el => el.indexOf('pos') > -1
            )[0].split('-');
            switch (dir) {
                case 'next':
                    if (currentWord.pos.vertical) {
                        setActive($('.pos-' + (+pos[1] + 1) + '-' + pos[2]));
                    } else {
                        setActive($('.pos-' + pos[1] + '-' + (+pos[2] + 1)));
                    }
                    break;
                case 'prev':
                    if (currentWord.pos.vertical) {
                        setActive($('.pos-' + (+pos[1] - 1) + '-' + pos[2]));

                    } else {
                        setActive($('.pos-' + pos[1] + '-' + (+pos[2] - 1)));
                    }
                    break;
                case 'first':
                    if (currentWord.pos.vertical) {
                        setActive($('.pos-' + (+currentWord.pos.row + 1) + '-' + pos[2]));

                    } else {
                        setActive($('.pos-' + pos[1] + '-' + (+currentWord.pos.cell + 1)));
                    }
                    break;
                case 'last':
                    if (currentWord.pos.vertical) {
                        setActive($('.pos-' + currentWord.word.length + '-' + pos[2]));

                    } else {
                        setActive($('.pos-' + pos[1] + '-' + currentWord.word.length));
                    }
                    break;
            }
        }
    }
    let activeWord = function () {
        $('.cell').on('click', function (e) {
            var el = $(this),
                data = el.data('cell');
            if (!el.hasClass('selected') || el.hasClass('active')) {
                toggleDir(data);
            }
            setActive(el);
        });
    }
    let toggleDir = function (data) {
        if (data.vertical && data.horizontal) {
            if (currentWord == data.vertical.word) {
                currentWord = data.horizontal.word;
            } else {
                currentWord = data.vertical.word;
            }
        } else {
            currentWord = data.vertical ? data.vertical.word : data.horizontal.word;
        }
        $('.cell').removeClass('selected');
        wordCells(currentWord, function (index, el) {
            el.addClass('selected');
        })
    }
    let setActive = function (el) {
        if (el.length) {
            el.addClass('active')
                .siblings()
                .removeClass('active');
            currentCell = el;
        }
    }
    let unfocus = function () {
        $('.cell')
            .removeClass('selected active')
        currentWord = undefined;
        currentCell = undefined;
    }
})()