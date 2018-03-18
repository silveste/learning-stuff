package com.silveste;
import java.util.Scanner;
public class X {
    private int x;

    public X() {
        Scanner x = new Scanner(System.in);
        System.out.println("Type a number: ");
        this.x = x.nextInt();
    }

    public void x(){
        for (int x = 0; x <= 12; x++){
            System.out.println(x*this.x);
        }
    }
}
