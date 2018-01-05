(function () {
    let scanword;
    const loadScanwords = function () {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/data/sc2.json', true);
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        resolve(JSON.parse(this.responseText));
                    } else {
                        reject(this.responseText);
                    }
                }
            }
            xhr.send();
        });
    };
    $(document).ready(function () {
        loadScanwords()
            .then(res => {
                scanword = new Scanword(res.map(
                    obj => new Word(obj)
                ));
                scanword.init({
                    counter: {
                        total: '#total',
                        done: '#done',
                        el: '.counter'
                    },
                    class: {
                        selected: 'selected',
                            active: 'active',
                            done: 'done',
                            question: 'question'
                    },
                    arrowClasses: {

                    },
                    scanword: '#scanword',
                    cellClass: '.cell'
                });
            })
    });
    const Scanword = function (words) {
        this.words = words;
        const size = this.words.reduce(function (prev, curr, index) {
            let width = 0,
                height = 0;
            if (curr.pos.vertical) {
                width = curr.pos.cell + 1;
                height = curr.pos.row + curr.word.length;
            } else {
                width = curr.pos.cell + curr.word.length;
                height = curr.pos.row + 1;
            }
            if (curr.qPos) {
                width = width < curr.qPos.cell ? curr.qPos.cell : width;
                height = height < curr.qPos.row ? curr.qPos.row : height;
            }
            prev.width = prev.width < width ? width : prev.width;
            prev.height = prev.height < height ? height : prev.height;
            return prev;
        }, {
            width: 0,
            height: 0
        })
        this.width = size.width;
        this.height = size.height;
        this.done = 0;
        this.currentCell = undefined;
        this.currentWord = undefined;
    }
    Scanword.prototype = {
        cellByPos: function (cell, row) {
            return $('.pos-' + cell + '-' + row);
        },
        cellToggle: function (dir) {
            const _this = this;
            if (_this.currentWord) {
                let pos = _this.cellGetPos(_this.currentCell);
                switch (dir) {
                    case 'next':
                        if (_this.currentWord.pos.vertical) {
                            return _this.cellSetActive(_this.cellByPos(pos.cell, pos.row + 1));
                        } else {
                            return _this.cellSetActive(_this.cellByPos(pos.cell + 1, pos.row));
                        }
                        break;
                    case 'prev':
                        if (_this.currentWord.pos.vertical) {
                            return _this.cellSetActive(_this.cellByPos(pos.cell, pos.row - 1));
                        } else {
                            return _this.cellSetActive(_this.cellByPos(pos.cell - 1, pos.row));
                        }
                        break;
                    case 'first':
                        if (_this.currentWord.pos.vertical) {
                            return _this.cellSetActive(_this.cellByPos(pos.cell, _this.wordGetPositions(_this.currentWord).start));

                        } else {
                            return _this.cellSetActive(_this.cellByPos(_this.wordGetPositions(_this.currentWord).start, pos.row));
                        }
                        break;
                    case 'last':
                        if (_this.currentWord.pos.vertical) {
                            return _this.cellSetActive(_this.cellByPos(pos.cell, _this.wordGetPositions(_this.currentWord).end));
                        } else {
                            return _this.cellSetActive(_this.cellByPos(_this.wordGetPositions(_this.currentWord).end, pos.row));
                        }
                        break;
                }
            }
            return false;
        },
        cellSetActive: function (el) {
            const _this = this;
            if (el.length) {

                el.addClass(_this.selectors.class.active)
                    .siblings()
                    .removeClass(_this.selectors.class.active);
                _this.currentCell = el;
                if (el.hasClass(_this.selectors.class.question)) {
                    _this.wordGetByQuestion(el);
                }
                return el;
            }
            return false;
        },
        cellGetPos: function (el) {
            const pos = el.attr('class').split(' ').filter(
                cls => cls.indexOf('pos') > -1
            )[0].split('-');
            return {
                cell: +pos[1],
                row: +pos[2]
            };
        },
        wordSetDone: function (wordObj) {
            const _this = this;
            wordObj.active = false;
            _this.done++;
            $(_this
                    .selectors
                    .counter
                    .done)
                .text(_this.done);
            if (_this.done == _this.words.length) {
                $(_this
                        .selectors
                        .counter
                        .el)
                    .addClass(_this.selectors.class.done);
            }
            _this.wordIterateCells(wordObj, function (index, el) {
                el.addClass(_this.selectors.class.done);
            })
        },
        wordIterateCells: function (word, callback) {
            const _this = this;
            for (let i = 0; i < word.word.length; i++) {
                let pos = word.pos.vertical ? {
                    cell: word.pos.cell,
                    row: word.pos.row + i
                } : {
                    cell: word.pos.cell + i,
                    row: word.pos.row
                };
                callback(i, _this.cellByPos(pos.cell, pos.row));
            }
        },
        wordGetPositions: function (word) {
            let wordPos = {};
            if (word.pos.vertical) {
                wordPos.start = word.pos.row;
                wordPos.end = word.pos.row + word.word.length - 1;
            } else {
                wordPos.start = word.pos.cell;
                wordPos.end = word.pos.cell + word.word.length - 1;
            }
            return wordPos;
        },
        wordToggleDir: function (data) {
            const _this = this;
            if (data.vertical && data.horizontal) {
                if (_this.currentWord == data.vertical.word) {
                    _this.wordSetActive(data.horizontal.word);
                } else {
                    _this.wordSetActive(data.vertical.word);
                }
            } else {
                _this.wordSetActive(data.vertical ? data.vertical.word : data.horizontal.word);
            }
        },
        wordToggle: function (cell) {
            if (cell.length) {
                const _this = this,
                    data = cell.data('cell');
                _this.cellSetActive(cell);
                if (!cell.hasClass(_this.selectors.class.question)) {
                    if (data.vertical && data.horizontal) {
                        if (_this.currentWord.pos.vertical) {
                            _this.wordSetActive(data.vertical.word);
                        } else {
                            _this.wordSetActive(data.horizontal.word);
                        }
                    } else {
                        _this.wordSetActive(data.vertical ? data.vertical.word : data.horizontal.word);
                    }
                }
            }
        },
        wordSetActive: function (word) {
            const _this = this;
            $(_this.selectors.cellClass).removeClass(_this.selectors.class.selected);
            _this.wordIterateCells(word, function (index, el) {
                el.addClass(_this.selectors.class.selected);
            })
            _this.currentWord = word;
        },
        wordGetByQuestion: function (qCell) {
            const _this = this,
                word = qCell.data('cell');
            _this.wordSetActive(word);
        },
        symAdd: function (sym) {
            const _this = this;
            if (!_this.currentCell.hasClass(_this.selectors.class.done)) {
                _this.currentCell.text(sym);
                let data = _this.currentCell.data('cell');
                for (let key in data) {
                    let wordObj = data[key].word,
                        answer = data[key].word.answer,
                        index = data[key].index;
                    answer[index] = sym;
                    if (answer.join('')
                        .toLowerCase()
                        .replace('ё', 'е')
                        .replace('й', 'и') ==
                        wordObj.word) {
                        _this.wordSetDone(wordObj);
                    }
                }
                if (_this.currentCell) _this.cellToggle('next');
            } else {
                const diffSym = sym != _this.currentCell.text(),
                    nextCell = _this.cellToggle('next');
                if (diffSym && nextCell && !nextCell.hasClass(_this.selectors.class.question)) _this.symAdd(sym);
            }
        },
        symRemove: function () {
            const _this = this;
            if (!_this.currentCell.hasClass(_this.selectors.class.done) && !_this.currentCell.hasClass(_this.selectors.class.question)) {
                _this.currentCell.text('');
                let cellData = _this.currentCell.data('cell');
                for (let key in cellData) {
                    const data = cellData[key];
                    data.word.answer[data.index] = null;
                }
            };
        },
        init(selectors) {
            const _this = this;
            _this.selectors = selectors;
            setInput();
            buildScanword();
            inputFocus();
            activeWord();

            $(_this.selectors.counter.total).text(_this.words.length);
            $(_this.selectors.counter.done).text(_this.done);

            function setInput() {
                _this.selectors.input = $('<input style="position:fixed; left: -10px; top: -10px; opacity: 0; width: 0; height: 0;" type="text" autofocus>').appendTo(_this.selectors.scanword);
            }

            function buildScanword() {
                let scanwordEl = $(_this.selectors.scanword);
                scanwordEl.css({
                    'width': 4 * scanword.width + 'rem',
                    'height': 4 * scanword.height + 'rem'
                })
                let row = 0,
                    cell = 0;
                for (let i = 0; i < scanword.width * scanword.height; i++) {
                    let cellEl = $('<a href="#" class="' + _this.selectors.cellClass.slice(1, _this.selectors.cellClass.length) + '"></a>').appendTo(_this.selectors.scanword);
                    cellEl.addClass('pos-' + cell + '-' + row);
                    cell++;
                    if (cell >= scanword.width) {
                        row++;
                        cell = 0;
                    }
                }
                let words = scanword.words;
                for (let key in words) {
                    const word = words[key],
                        qPos = word.qPos ? {
                            cell: word.qPos.cell,
                            row: word.qPos.row
                        } : {
                            cell: word.pos.cell,
                            row: word.pos.row
                        };
                    let qEl = _this.cellByPos(qPos.cell, qPos.row);
                    qEl.addClass(_this.selectors.class.question);
                    qEl.data('cell', word)
                    if (word.qPos) {
                        const qPos = word.qPos,
                            pos = word.pos;
                        if (pos.cell > qPos.cell) {
                            qEl.addClass('arrow-right');
                        } else if (pos.cell < qPos.cell) {
                            qEl.addClass('arrow-left');
                        }
                        if (pos.row > qPos.row) {
                            qEl.addClass('arrow-bottom');
                        } else if (pos.row < qPos.row) {
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
                    if (!word.qPos) {
                        if (word.pos.vertical) {
                            word.pos.row++;
                        } else {
                            word.pos.cell++;
                        }
                    }
                    _this.wordIterateCells(word, function (index, el) {
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

            function activeWord() {
                $(_this.selectors.cellClass).on('click', function (e) {
                    e.preventDefault();
                    var el = $(this),
                        data = el.data('cell');
                    if (!el.hasClass(_this.selectors.class.question) && (!el.hasClass(_this.selectors.class.selected) || el.hasClass(_this.selectors.class.active))) {
                        _this.wordToggleDir(data);
                    }
                    _this.cellSetActive(el);
                });
            }

            function inputFocus() {
                $(_this.selectors.scanword).on('click', function (e) {
                    e.preventDefault();
                    _this.selectors.input.focus();
                })
                _this.selectors.input.on('keydown', function (e) {
                    if (_this.currentCell) {
                        switch (e.keyCode) {
                            case 35:
                                _this.cellToggle('last');
                                break;
                            case 36:
                                _this.cellToggle('first');
                                break;
                            case 37:
                                if (_this.currentWord.pos.vertical) {
                                    const pos = _this.cellGetPos(_this.currentCell);
                                    _this.wordToggle(_this.cellByPos(pos.cell - 1, pos.row));
                                } else {
                                    _this.cellToggle('prev')
                                }
                                break;
                            case 38:
                                if (_this.currentWord.pos.vertical) {
                                    _this.cellToggle('prev')
                                } else {
                                    const pos = _this.cellGetPos(_this.currentCell);
                                    _this.wordToggle(_this.cellByPos(pos.cell, pos.row - 1));
                                }
                                break;
                            case 39:
                                if (_this.currentWord.pos.vertical) {
                                    const pos = _this.cellGetPos(_this.currentCell);
                                    _this.wordToggle(_this.cellByPos(pos.cell + 1, pos.row));
                                } else {
                                    _this.cellToggle('next')
                                }
                                break;
                            case 40:
                                if (_this.currentWord.pos.vertical) {
                                    _this.cellToggle('next')
                                } else {
                                    const pos = _this.cellGetPos(_this.currentCell);
                                    _this.wordToggle(_this.cellByPos(pos.cell, pos.row + 1));
                                }
                                break;
                            default:
                                if (_this.currentCell.hasClass(_this.selectors.class.question)) {
                                    e.preventDefault();
                                    const data = _this.currentCell.data('cell');
                                    _this.cellSetActive(_this.cellByPos(data.pos.cell, data.pos.row));
                                    if (e.key.match(/[а-яА-ЯіІїЇъЪёЁ]/)) {
                                        _this.symAdd(e.key);
                                    }
                                } else {
                                    if (e.key.match(/[а-яА-ЯіІїЇъЪёЁ]/))
                                        _this.symAdd(e.key);
                                    switch (e.keyCode) {
                                        case 8:
                                        case 46:
                                            if (e.keyCode == 8 && (_this.currentCell.text() == '' || _this.currentCell.hasClass(_this.selectors.class.done))) {
                                                const cellPos = _this.cellGetPos(_this.currentCell);
                                                if (!(_this.currentWord.pos.cell == cellPos.cell && _this.currentWord.pos.row == cellPos.row)) {
                                                    _this.cellToggle('prev');
                                                }
                                            }
                                            _this.symRemove();
                                            break;
                                        case 9:
                                            e.preventDefault();
                                            _this.wordToggleDir(_this.currentCell.data('cell'));
                                            break;
                                    }
                                }
                                break;
                        }
                    }
                })
            }
        }
    }
    const Word = function (word) {
        this.question = word.question;
        this.word = word.word;
        word.qPos ? this.qPos = word.qPos : null;
        this.pos = word.pos;
        this.answer = [];
        this.active = true;
    }
})();