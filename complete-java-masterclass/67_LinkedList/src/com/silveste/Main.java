package com.silveste;

import java.util.ArrayList;

public class Main {

    public static void main(String[] args) {
        System.out.println("Creating albums...");
        ArrayList<Album> collection = new ArrayList<>();
        Album album = new Album("Diamonds om the inside", "Ben Harper");
        String[] songsAlbum = {
                 "With my own two hands",
                 "When it's good",
                 "Diamonds on the inside",
                 "Touch from your lust",
                 "When she believes",
                 "Brown eyed blues",
                 "Bring the funk",
                 "Everything",
                 "Amen Omen",
                 "Temporary Remedy",
                 "So high so low",
                 "Blessed to be a witness"};
        for (String i: songsAlbum){
            Song song = new Song(i,Math.random()*4 + 1);
            album.addSong(song);
        }
        collection.add(album);
        album = new Album("Money for nothing", "Dire straits");
        songsAlbum = new String[] {
                "Down to the waterline",
                "Tunnel of love",
                "Romeo and juliet",
                "Where do you think you're going?",
                "Walk of life",
                "Private investigations",
                "Money for nothing",
                "Brothers in arms"};
        for (String i: songsAlbum){
            Song song = new Song(i,Math.random()*4 + 1);
            album.addSong(song);
        }
        collection.add(album);
        Menu menu = new Menu(collection);
        boolean quit = false;
        while (!quit){
            quit = menu.showMainMenu();
        }

    }
}
