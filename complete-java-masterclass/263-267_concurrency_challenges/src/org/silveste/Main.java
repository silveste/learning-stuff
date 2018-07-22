package org.silveste;

public class Main {

    public static void main(String[] args) {
	   final BankAccount account = new BankAccount("123-456-789", 1000.00);

	    Thread trThread1 = new Thread() {
            private String color = ThreadColor.ANSI_GREEN;
	        public void run() {
	            account.deposit(300.00, color);
	            account.withdraw(50.00, color);
            }
        };
	    Thread trThread2 = new Thread() {
	        private String color = ThreadColor.ANSI_RED;
	        public void run() {
	            account.deposit(203.75, color);
	            account.withdraw(100.00, color);
            }
        };

	    trThread1.start();
	    trThread2.start();



    }
}
