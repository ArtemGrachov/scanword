(function () {
    $(document).ready(function () {
        inputFocus();
        buildScanword(scanword);
        activeWord();
    });
    const Scanword = function (words, width, height) {
        this.words = words;
        // width and length are temporary arguments
        this.width = width;
        this.height = height;
    }
    const Word = function (question, word, pos, origin) {
        this.question = question;
        this.word = word;
        this.pos = pos;
        origin ? this.origin = origin : null;
        this.answer = [];
        this.active = true;
    }
    const scanword1 = new Scanword([
        new Word('Удар в бильярде', 'эффе', {
            cell: 0,
            row: 0,
            vertical: true
        }, {
            cell: 1,
            row: 0
        }),
        new Word('Фракийский царь, союзник троянцев', 'рес', {
            cell: 2,
            row: 0,
            vertical: true
        }),
        new Word('Недотепа, лопух', 'растяпа', {
            cell: 4,
            row: 0,
            vertical: true
        }, {
            cell: 3,
            row: 0
        }),
        new Word('Река в горах Южной Сибири', 'казыр', {
            cell: 5,
            row: 0,
            vertical: true
        }),
        new Word('Жалящее насекомое', 'оса', {
            cell: 6,
            row: 0,
            vertical: true
        }),
        new Word('Правый приток Енисея', 'ус', {
            cell: 7,
            row: 0
        }, {
            cell: 8,
            row: 1
        }),
        new Word('Что лечит отиатр?', 'ухо', {
            cell: 8,
            row: 0,
            vertical: true
        }),
        new Word('Эмблема, знак', 'символ', {
            cell: 9,
            row: 0,
            vertical: true
        }),
        new Word('Украинский писатель', 'франко', {
            cell: 0,
            row: 1
        }),
        new Word('Женское имя', 'алена', {
            cell: 7,
            row: 1,
            vertical: true
        }),
        new Word('Город в Марокко', 'фес', {
            cell: 0,
            row: 2
        }),
        new Word('Гора на острове Хоккайдо', 'асахи', {
            cell: 4,
            row: 2
        }),
        new Word('Древний город на Крите', 'фест', {
            cell: 0,
            row: 4
        }, {
            cell: 0,
            row: 3
        }),
        new Word('Сорт сельди', 'залом', {
            cell: 4,
            row: 3
        }),
        new Word('Музей в Санкт-Петербурге', 'эрмитаж', {
            cell: 1,
            row: 4,
            vertical: true
        }),
        new Word('Музыкальный звук', 'си', {
            cell: 2,
            row: 4,
            vertical: true
        }),
        new Word('Спутник Сатурна', 'елена', {
            cell: 4,
            row: 4,
            vertical: true
        }),
        new Word('Мужское имя', 'аким', {
            cell: 6,
            row: 4,
            vertical: true
        }),
        new Word('Червь класса нематод', 'трихина', {
            cell: 8,
            row: 4,
            vertical: true
        }),
        new Word('Искусственный язык', 'эсперанто', {
            cell: 0,
            row: 5
        }),
        new Word('Дисциплина в мотоциклетном спорте', 'триал', {
            cell: 0,
            row: 7
        }, {
            cell: 0,
            row: 6
        }),
        new Word('Имя французских королей', 'карл', {
            cell: 5,
            row: 6
        }),
        new Word('Одежда священника', 'риза', {
            cell: 2,
            row: 7,
            vertical: true
        }),
        new Word('Оросительный канал', 'арык', {
            cell: 3,
            row: 7,
            vertical: true
        }),
        new Word('Насекомое отряда двухкрылых', 'муха', {
            cell: 5,
            row: 7
        }, {
            cell: 6,
            row: 8
        }),
        new Word('Часть комнаты, сдаваемая в наем', 'угол', {
            cell: 7,
            row: 7,
            vertical: true
        }),
        new Word('Древневосточный бог грозы', 'адад', {
            cell: 9,
            row: 7,
            vertical: true
        }),
        new Word('Страна в Азии', 'иран', {
            cell: 0,
            row: 8
        }),
        new Word('Единица яркости', 'нит', {
            cell: 5,
            row: 8,
            vertical: true
        }),
        new Word('Экскурсовод', 'гид', {
            cell: 6,
            row: 9
        }),
        new Word('Жестокий, властный человек', 'тиран', {
            cell: 0,
            row: 9
        }),
        new Word('Основа', 'азы', {
            cell: 0,
            row: 10
        }),
        new Word('Изорбражение бога, святых', 'икона', {
            cell: 4,
            row: 10
        }),
        new Word('Короткая верхняя одежда', 'жакет', {
            cell: 0,
            row: 11
        }),
        new Word('Согласие, мир, порядок', 'лад', {
            cell: 6,
            row: 11
        })
    ], 10, 12)

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
                word: 'tttt',
                answer: [],
                active: true,
                pos: {
                    cell: 3,
                    row: 0,
                    vertical: true
                },
                origin: {
                    cell: 4,
                    row: 0
                }
            }
        }
    }
    const scanword = scanword1;
    let currentCell = undefined,
        currentWord = undefined;
    let inputFocus = function () {
        $('#scanword').on('click', function (e) {
            e.preventDefault();
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
                            const pos = getCellPos(currentCell);
                            setActiveWord($('.pos-' + (pos.row) + '-' + (pos.cell - 1)));
                        } else {
                            toggleCell('prev')
                        }
                        break;
                    case 38:
                        if (currentWord.pos.vertical) {
                            toggleCell('prev')
                        } else {
                            const pos = getCellPos(currentCell);
                            setActiveWord($('.pos-' + (pos.row - 1) + '-' + (pos.cell)));
                        }
                        break;
                    case 39:
                        if (currentWord.pos.vertical) {
                            const pos = getCellPos(currentCell);
                            setActiveWord($('.pos-' + (pos.row) + '-' + (pos.cell + 1)));
                        } else {
                            toggleCell('next')
                        }
                        break;
                    case 40:
                        if (currentWord.pos.vertical) {
                            toggleCell('next')
                        } else {
                            const pos = getCellPos(currentCell);
                            setActiveWord($('.pos-' + (pos.row + 1) + '-' + (pos.cell)));
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
            'width': 4 * scanword.width + 'rem',
            'height': 4 * scanword.height + 'rem'
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
                    cellEl.addClass('arrow-bottom arrow-vertical');
                } else {
                    cellEl.addClass('arrow-right');
                }
            }

            cellEl.text(word.question);
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
            let pos = getCellPos(currentCell);
            switch (dir) {
                case 'next':
                    if (currentWord.pos.vertical) {
                        setActiveCell($('.pos-' + (pos.row + 1) + '-' + pos.cell));
                    } else {
                        setActiveCell($('.pos-' + pos.row + '-' + (+pos.cell + 1)));
                    }
                    break;
                case 'prev':
                    if (currentWord.pos.vertical) {
                        setActiveCell($('.pos-' + (pos.row - 1) + '-' + pos.cell));

                    } else {
                        setActiveCell($('.pos-' + pos.row + '-' + (pos.cell - 1)));
                    }
                    break;
                case 'first':
                    if (currentWord.pos.vertical) {
                        setActiveCell($('.pos-' + (currentWord.origin ? currentWord.origin.row : currentWord.pos.row + 1) + '-' + pos.cell));

                    } else {
                        setActiveCell($('.pos-' + pos.row + '-' + (currentWord.origin ? currentWord.origin.cell : currentWord.pos.cell + 1)));
                    }
                    break;
                case 'last':
                    if (currentWord.pos.vertical) {
                        setActiveCell($('.pos-' + (currentWord.origin ? currentWord.word.length - 1 : currentWord.word.length) + '-' + pos.cell));
                    } else {
                        setActiveCell($('.pos-' + pos.row + '-' + currentWord.word.length));
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
            setActiveCell(el);
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
    let setActiveCell = function (el) {
        if (el.length) {
            el.addClass('active')
                .siblings()
                .removeClass('active');
            currentCell = el;
        }
    }
    let setActiveWord = function (el) {
        console.log(el)
    }
    let getCellPos = function (el) {
        const pos = el.attr('class').split(' ').filter(
            cls => cls.indexOf('pos') > -1
        )[0].split('-');
        return {
            row: +pos[1],
            cell: +pos[2]
        };
    }
})()