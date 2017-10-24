package com.silveste;

public class Main {

    public static void main(String[] args) {
	    char val = 'l';
	    switch (val){
            case 'a':
                System.out.println("Case A");
                break;
            case 'b':
                System.out.println("Case B");
                break;
            case 'c': case 'd': case 'e':
                System.out.println("Case c d and e");
                break;
            default:
                System.out.println("Case Default");
                break;

        }
    }
}
