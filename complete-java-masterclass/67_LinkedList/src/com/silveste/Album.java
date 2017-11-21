package com.silveste;

import java.util.ArrayList;

public class Album {
    private ArrayList<Song> songs;
    private String title;
    private String author;

    public Album(String title, String author) {
        this.title = title;
        this.author = author;
        this.songs = new ArrayList<>();
    }

    public Song getSong(int pos) {
        return songs.get(pos-1);
    }

    public Song getSong(String title){
        for (int i = 0; i < songs.size(); i++ ){
            if (songs.get(i).toString().contains(title)){
                return songs.get(i);
            }
        }
        return null;
    }

    @Override
    public String toString(){
        String result = "Album: " + title + "\n Author: " + author + "\n Songs:\n";
        for (int i = 0; i < songs.size(); i++ ){
            result += (i+1) + "-" + songs.get(i).toString() + "\n";
        }
        return result;
    }

    public boolean hasSong(Song song){
        if (songs.contains(song)){
            return true;
        }

        return false;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public boolean addSong(Song song){
        if (hasSong(song)){ return false;}
        songs.add(song);
        return true;
    }
}
