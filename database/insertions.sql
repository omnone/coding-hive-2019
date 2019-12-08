INSERT INTO User (username, email, password_,)
VALUES  ("ilias123", "ilias@gmail.com", "23242526"),
        ("alex212121", "alex21@gmail.com","25642526"),
        ("kostas3", "kostas33@gmail.com", "232gh526"),
        ("dimitris2122", "mitsaras@gmail.com", "qwerty42526");



INSERT INTO Project (name_) VALUES  ("project1","project2","project3","project4");


INSERT INTO Status_ (description_) VALUES  ("90%","53%","25%","32%");




INSERT INTO permission (userID,projectID,statusID)  VALUES ((SELECT userid FROM User WHERE User.userID = ?),
                                                            (SELECT projectID FROM Project WHERE Project.projectID=?),
                                                            (SELECT statusID FROM Status_ WHERE Status_.statusID=?)); 





INSERT INTO Issue (projectID, statusID, title, description_,assignor, assignee, type_, otherDetails) 
VALUES ( ((SELECT projectID FROM Project WHERE Project.projectID=?),
         (SELECT statusID FROM Status_ WHERE Status_.statusID=?),
        "project n1","Alexandros","dimitris","1","nothing"),
         ((SELECT projectID FROM Project WHERE Project.projectID=?),
        (SELECT statusID FROM Status_ WHERE Status_.statusID=?),
        "project n2","Ilias","Kostas","0","nothing"),
        ((SELECT projectID FROM Project WHERE Project.projectID=?),
        (SELECT statusID FROM Status_ WHERE Status_.statusID=?),
        "project n3","orestis","dimitris","1","nothing"),
        ((SELECT projectID FROM Project WHERE Project.projectID=?),
        (SELECT statusID FROM Status_ WHERE Status_.statusID=?),
        "project n4","Alexandros","Kostas","2","nothing"));













                                                                                                                                                                                                    )

















