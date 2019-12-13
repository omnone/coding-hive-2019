# coding-hive

**Tips:**
1. Για να ανοίξουμε το project στο intelij:
 https://www.lagomframework.com/documentation/1.5.x/java/IntellijMaven.html
 
2. **Για το bug του npm** : npm install react-scripts@2.1.8

##
**Search request**
#####
Το request που θα σταλεί από το front πρέπει να είναι στη μορφή <br> <br>
{ <br>project_id = 3, <br>
issue_title = "Titlos",<br>
assignee_id = 10,<br>
assignor_id = 30,<br>
status_id = 10,<br>
category = 1<br>
}
<br>
<br>
Συμπληρώνονται μόνο τα απαραίτητα πεδία. Στα άλλα δε μπαίνει default τιμή, δεν υπάρχουν καθόλου στο request.<br>
Για να υλοποιήσω το request που ζητάει να βρω όλα τα ανοιχτά θέματα μου, βάζω assignee_id = my_id (το front θα έχει
πρόσβαση στο username άρα και στο id αφού έχει υλοποιηθεί κατάλληλο api) και στο status_id το id που αντιστοιχεί στo
description "open" (πιθανόν το θεωρούμε hardcoded  και έχει πάντα συγκεκριμένο id, άρα δε χρειάζεται api).

##
