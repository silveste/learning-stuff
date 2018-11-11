package com.silveste;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.ListIterator;
import java.util.Scanner;

public class Menu {
    private ArrayList<Album> albums;
    private Scanner scanner;
    private LinkedList<Song> playList;

    public Menu(ArrayList<Album> albums) {
        this.albums = albums;
        this.playList = new LinkedList<>();
        this.scanner = new Scanner(System.in);
    }

    public boolean showMainMenu() {
        if (playList.isEmpty()) {
            System.out.println("Playlist is Empty");
            System.out.println("Options:\n" +
                    "A-Add song\n" +
                    "B-Quit");
            String option = scanner.nextLine().toLowerCase();
            switch (option) {
                case "a":
                    addSong();
                    break;
                case "b":
                    return true;
            }
        } else {
            ListIterator<Song> iterator = playList.listIterator();
            boolean forward = true;
            System.out.println("Playing: " + iterator.next().toString());
            while (true) {
                System.out.println("Options:\n" +
                        "A-Play again\n" +
                        "B-Next\n" +
                        "C-Previous\n" +
                        "D-Remove song\n" +
                        "E-Add song\n" +
                        "F-Quit");
                String option = scanner.nextLine().toLowerCase();
                switch (option) {
                    case "a":
                        if (forward) {
                            System.out.println("Playing: " + iterator.previous().toString());
                            forward = false;
                        } else {
                            System.out.println("Playing: " + iterator.next().toString());
                            forward = true;
                        }
                        break;
                    case "b":
                        if (!forward) {
                                iterator.next();
                                forward = true;
                        }
                        if (iterator.hasNext()) {
                            System.out.println("Playing: " + iterator.next().toString());
                        } else {
                            System.out.println("Last song reached");
                        }
                        break;
                    case "c":
                        if (forward) {
                                iterator.previous();
                                forward = false;
                        }
                        if (iterator.hasPrevious()){
                            System.out.println("Playing: " + iterator.previous().toString());
                        } else {
                            System.out.println("First song reached");
                        }
                        break;
                    case "d":
                        iterator.remove();
                        System.out.println("Successfully removed");
                        if (iterator.hasNext()) {
                            System.out.println("Playing: " + iterator.next().toString());
                            forward = true;
                        } else if (iterator.hasPrevious()) {
                            System.out.println("Playing: " + iterator.previous().toString());
                            forward = false;
                        } else {
                            return false;
                        }
                        break;
                    case "e":
                        addSong();
                        return false;
                    case "f":
                        return true;
                }

            }

        }
        return false;
    }

    public void addSong(){
        while(true) {
            System.out.println("Select album:");
            for (int i = 0; i < albums.size(); i++) {
                Album select = albums.get(i);
                System.out.println((i + 1) + "-" + select.getTitle() + ", " + select.getAuthor());
            }
            Album album = albums.get(scanner.nextInt()-1);
            scanner.nextLine();
            boolean songMenu;
            System.out.println(album.toString());
            System.out.println("Select song (Press 0 to finish): ");
            do {
              int typed = scanner.nextInt();
              scanner.nextLine();
              if (typed == 0){
                   songMenu = false;
              } else {
                  Song choosen = album.getSong(typed);
                  playList.add(choosen);
                  System.out.println("Added: " + choosen.toString());
                  System.out.println("Choose other or press 0 to finish.");
                  songMenu = true;
              }
            } while (songMenu);
                System.out.println("Would you like to select other album?(Y/N)");
                String answer = scanner.nextLine();
                if (!answer.toLowerCase().equals("y")){
                    return;
                }
        }

    }


}
