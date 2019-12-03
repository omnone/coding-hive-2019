package com.coredumped.skyroof_constructions;

import com.coredumped.skyroof_constructions.dao.UserDao;
import com.coredumped.skyroof_constructions.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;


@Component
public class dataInit implements ApplicationRunner {
    private UserDao userDao;


    //isos exei lathos edw
    @Autowired
    public dataInit(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        long count = userDao.count();

        if (count == 0) {
            User p1 = new User();

            p1.setUsername("giannhs");
            p1.setEmail("randomemail@gmail.com");
            p1.setPassword("32323a2");
            p1.setUserId(3232);


            User p2 = new User();

            p2.setUsername("miasdua");
            p2.setEmail("randomemawadwail@gmail.com");
            p2.setPassword("3zxz1");
            p2.setUserId(5632);

            userDao.save(p1);
            userDao.save(p2);
        }
    }
}
