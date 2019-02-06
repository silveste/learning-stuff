package com.silveste;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HelloMaven {


    //LoggerFactory is the utility class that will produce the logger
    private final static Logger log = LoggerFactory.getLogger(HelloMaven.class);

    public static void main(String[] args) {
        log.info("Hello info");
        log.debug("Hello debug");

    }
}
