package com.silveste;

public class Main {

    public static void main(String[] args) {
	   com.silveste.Account pepeAccount = new com.silveste.Account();
	   pepeAccount.setCustomerName("Pepe");
	   pepeAccount.setBalance(22_045.23);
	   pepeAccount.setEmail("pepe@email.com");
	   pepeAccount.setNumber("123456ABCD");
	   pepeAccount.setPhoneNumber(918517145);

	   pepeAccount.deposit(3_000.00);
	   pepeAccount.withdraw(15_000.26);
	   pepeAccount.withdraw(30_000.25);
    }
}
