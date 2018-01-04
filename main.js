(function () {
    $(document).ready(function () {
        inputFocus();
        buildScanword(scanword);
        activeWord();
    });
    const Scanword = function (words, width, height) {
        this.words = words;
        // width and length are temporary
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
        $('body').on('keypress', function (e) {
            e.preventDefault();
            if (currentCell) inputSym(e.key);
        })
        $('body').on('keydown', function (e) {
            if (currentCell) {
                switch (e.keyCode) {
                    case 8:
                    case 46:
                        if (e.keyCode == 8 && currentCell.text() == '') {
                            toggleCell('prev');
                        }
                        removeSym();
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
                            toggleWord(cellByPos(pos.cell - 1, pos.row));
                        } else {
                            toggleCell('prev')
                        }
                        break;
                    case 38:
                        if (currentWord.pos.vertical) {
                            toggleCell('prev')
                        } else {
                            const pos = getCellPos(currentCell);
                            toggleWord(cellByPos(pos.cell, pos.row - 1));
                        }
                        break;
                    case 39:
                        if (currentWord.pos.vertical) {
                            const pos = getCellPos(currentCell);
                            toggleWord(cellByPos(pos.cell + 1, pos.row));
                        } else {
                            toggleCell('next')
                        }
                        break;
                    case 40:
                        if (currentWord.pos.vertical) {
                            toggleCell('next')
                        } else {
                            const pos = getCellPos(currentCell);
                            toggleWord(cellByPos(pos.cell, pos.row + 1));
                        }
                        break;
                }
            }
        })
    }
    let inputSym = function (sym) {
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
        } else {
            const diffSym = sym != currentCell.text(),
                nextCell = toggleCell('next');
            if (diffSym && nextCell) inputSym(sym);
        }
    }
    let setDone = function (wordObj) {
        wordObj.active = false;
        wordCells(wordObj, function (index, el) {
            el.addClass('done');
        })
    }
    let removeSym = function () {
        if (!currentCell.hasClass('done')) {
            currentCell.text('');
            let cellData = currentCell.data('cell');
            for (let key in cellData) {
                const data = cellData[key];
                data.word.answer[data.index] = null;
            }
        } else {
            toggleCell('prev');
        }
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
            cellEl.addClass('pos-' + cell + '-' + row);
            cell++;
            if (cell >= scanword.width) {
                row++;
                cell = 0;
            }
        }
        let words = scanword.words;
        for (let key in words) {
            let word = words[key],
                cell = word.pos.cell,
                row = word.pos.row;
            let qEl = cellByPos(cell, row);
            qEl.addClass('question');
            qEl.data('cell', word)
            if (word.origin) {
                const origin = word.origin,
                    pos = word.pos;
                if (origin.cell > pos.cell) {
                    qEl.addClass('arrow-right');
                } else if (origin.cell < pos.cell) {
                    qEl.addClass('arrow-left');
                }
                if (origin.row > pos.row) {
                    qEl.addClass('arrow-bottom');
                } else if (origin.row < pos.row) {
                    qEl.addClass('arrow-top');
                }
                if (word.pos.vertical) {
                    qEl.addClass('arrow-vertical');
                } else {
                    qEl.addClass('arrow-horizontal');
                }
            } else {
                if (word.pos.vertical) {
                    qEl.addClass('arrow-bottom arrow-vertical');
                } else {
                    qEl.addClass('arrow-right');
                }
            }
            qEl.html('<span>' + word.question + '</span>');
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
            let pos = word.pos.vertical ? {
                cell: cell,
                row: row + i
            } : {
                cell: cell + i,
                row: row
            };
            callback(i, cellByPos(pos.cell, pos.row));
        }
    }
    let toggleCell = function (dir) {
        if (currentWord) {
            let pos = getCellPos(currentCell);
            switch (dir) {
                case 'next':
                    if (currentWord.pos.vertical) {
                        return setActiveCell(cellByPos(pos.cell, pos.row + 1));
                    } else {
                        return setActiveCell(cellByPos(pos.cell + 1, pos.row));
                    }
                    break;
                case 'prev':
                    if (currentWord.pos.vertical) {
                        return setActiveCell(cellByPos(pos.cell, pos.row - 1));
                    } else {
                        return setActiveCell(cellByPos(pos.cell - 1, pos.row));
                    }
                    break;
                case 'first':
                    if (currentWord.pos.vertical) {
                        return setActiveCell(cellByPos(pos.cell, getWordPositions(currentWord).start));

                    } else {
                        return setActiveCell(cellByPos(getWordPositions(currentWord).start, pos.row));
                    }
                    break;
                case 'last':
                    if (currentWord.pos.vertical) {
                        return setActiveCell(cellByPos(pos.cell, getWordPositions(currentWord).end));
                    } else {
                        return setActiveCell(cellByPos(getWordPositions(currentWord).end, pos.row));
                    }
                    break;
            }
        }
        return false;
    }
    let activeWord = function () {
        $('.cell').on('click', function (e) {
            var el = $(this),
                data = el.data('cell');
            if (!el.hasClass('question') && (!el.hasClass('selected') || el.hasClass('active'))) {
                toggleDir(data);
            }
            setActiveCell(el);
        });
    }
    let getWordPositions = function (word) {
        let wordPos = {};
        if (word.origin) {
            if (word.pos.vertical) {
                wordPos.start = word.origin.row;
                wordPos.end = word.origin.row + word.word.length - 1;
            } else {
                wordPos.start = word.origin.cell;
                wordPos.end = word.origin.cell + word.word.length - 1;
            }
        } else {
            if (word.pos.vertical) {
                wordPos.start = word.pos.row + 1;
                wordPos.end = word.pos.row + word.word.length;
            } else {
                wordPos.start = word.pos.cell + 1;
                wordPos.end = word.pos.cell + word.word.length;
            }
        }
        return wordPos;
    }
    let toggleDir = function (data) {
        if (data.vertical && data.horizontal) {
            if (currentWord == data.vertical.word) {
                setActiveWord(data.horizontal.word);
            } else {
                setActiveWord(data.vertical.word);
            }
        } else {
            setActiveWord(data.vertical ? data.vertical.word : data.horizontal.word);
        }
    }
    let toggleWord = function (cell) {
        const data = cell.data('cell');
        if (cell.hasClass('question')) {
            wordByQuestion(cell);
        } else {
            setActiveCell(cell);
            if (data.vertical && data.horizontal) {
                if (currentWord.pos.vertical) {
                    setActiveWord(data.vertical.word);
                } else {
                    setActiveWord(data.horizontal.word);
                }
            } else {
                setActiveWord(data.vertical ? data.vertical.word : data.horizontal.word);
            }
        }
    }
    let setActiveCell = function (el) {
        if (el.length) {
            if (el.hasClass('question')) {
                wordByQuestion(el);
            } else {
                el.addClass('active')
                    .siblings()
                    .removeClass('active');
                currentCell = el;
            }
            return el;
        }
        return false;
    }
    let setActiveWord = function (word) {
        $('.cell').removeClass('selected');
        wordCells(word, function (index, el) {
            el.addClass('selected');
        })
        currentWord = word;
    }
    let getCellPos = function (el) {
        const pos = el.attr('class').split(' ').filter(
            cls => cls.indexOf('pos') > -1
        )[0].split('-');
        return {
            cell: +pos[1],
            row: +pos[2]
        };
    }
    let wordByQuestion = function (qCell) {
        const word = qCell.data('cell');
        setActiveWord(word);
        let pos;
        if (word.origin) {
            pos = {
                row: word.origin.row,
                cell: word.origin.cell
            }
        } else {
            pos = {
                row: word.pos.vertical ? word.pos.row + 1 : word.pos.row,
                cell: word.pos.vertical ? word.pos.cell : word.pos.cell + 1
            }
        }
        setActiveCell(cellByPos(pos.cell, pos.row));
    }
    let cellByPos = function (cell, row) {
        return $('.pos-' + cell + '-' + row);
    }
})()