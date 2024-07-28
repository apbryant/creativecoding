; From Jon Campbell
; https://github.com/joncampbelldev
(defmacro with-matrix
  "Ensures every push-matrix has a matching pop-matrix.
  Also safely pops matrix when an error occurs."
  [& body]
  `(do
     (push-matrix)
     (try
       ~@body
       (finally
         (pop-matrix)))))
