var app = app || {};

app.lecturesViewBag = (function () {
    function showLectures(selector, data) {
        var allLectures = data.lectures;
        $.get('templates/calendar.html', function (templ) {
            var rendered = Mustache.render(templ);
            $(selector).html(rendered);
            $('#edit-lecture').hide();
            $('#delete-lecture').hide();
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: allLectures,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/add/'})
                            });
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                    });
                    $('#events-modal').modal();
                }
            });
        });
    }

    function showMyLectures(selector, data) {
        var myLectures = data.lectures;
        $.get('templates/calendar.html', function (templ) {
            var rendered = Mustache.render(templ);
            $(selector).html(rendered);
            $.get('templates/calendar.html', function (templ) {
                var rendered = Mustache.render(templ);
                $(selector).html(rendered);
                $('#calendar').fullCalendar({
                    theme: false,
                    header: {
                        left: 'prev,next today addEvent',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    defaultDate: '2016-01-12',
                    selectable: false,
                    editable: false,
                    eventLimit: true,
                    events: myLectures,
                    customButtons: {
                        addEvent: {
                            text: 'Add Event',
                            click: function () {
                                Sammy(function () {
                                    this.trigger('redirectUrl', {url: '#/calendar/add/'})
                                });
                            }
                        }
                    },
                    eventClick: function (calEvent, jsEvent, view) {
                        $.get('templates/modal.html', function (templ) {
                            var rendered = Mustache.render(templ, calEvent);
                            $('#modal-body').html(rendered);
                            $('#edit-lecture').on('click', function() {
                                var lectureId = $($(this).parent().prev().children()[0]).attr('data-id');
                                var lecture = data.lectures.filter(function (l) {
                                    return l.id == lectureId;
                                });

                                if(lecture.length) {
                                    Sammy(function () {
                                        this.trigger('showEditLecture', lecture[0]);
                                    });
                                }
                            });
                            $('#delete-lecture').on('click', function() {
                                var lectureId = $($(this).parent().prev().children()[0]).attr('data-id');
                                var lecture = data.lectures.filter(function (l) {
                                    return l.id == lectureId;
                                });

                                if(lecture.length) {
                                    Sammy(function () {
                                        this.trigger('showDeleteLecture', lecture[0]);
                                    });
                                }
                            })
                        });
                        $('#events-modal').modal();
                    }
                });
            });
        });
    }

    function showAddLecture(selector) {
        $.get('templates/add-lecture.html', function (templ) {
            $(selector).html(templ);
            $('#addLecture').on('click', function () {
                var title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val(),
                    lecturer = sessionStorage['username'];

                Sammy(function () {
                    this.trigger('addLecture', {
                        title: title,
                        start: start,
                        end: end,
                        lecturer: lecturer
                    });
                });
            });
        });
    }

    function showEditLecture(selector, data) {
        $.get('templates/edit-lecture.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('body > div').last().hide();
            $('#editLecture').on('click', function () {
                var title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val(),
                    id = $(this).attr('data-id');

                Sammy(function () {
                    this.trigger('editLecture', {
                        title: title,
                        start: start,
                        end: end,
                        id: id
                    });
                });
            });
        });
    }

    function showDeleteLecture(selector, data) {
        $.get('templates/delete-lecture.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('body > div').last().hide();
            $('#deleteLecture').on('click', function () {
                var id = $(this).attr('data-id');

                Sammy(function () {
                    this.trigger('deleteLecture', {
                        id: id
                    });
                });
            });
        });
    }

    return {
        load: function () {
            return {
                showLectures: showLectures,
                showMyLectures: showMyLectures,
                showAddLecture: showAddLecture,
                showEditLecture: showEditLecture,
                showDeleteLecture: showDeleteLecture
            }
        }
    }
})();