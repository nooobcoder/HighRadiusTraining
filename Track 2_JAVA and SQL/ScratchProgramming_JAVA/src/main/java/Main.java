import java.util.ArrayList;
import java.util.Scanner;

import static java.lang.System.exit;

public class Main {

    public static void main(String[] args) {

        //Printing Info
        System.out.println("Choose the DataSource that you would like to connect to:");
        System.out.println("1. Postgres");
        System.out.println("2. Salesforce");

        //Reading choice from user
        Scanner keyboard = new Scanner(System.in);
        int choice = -1;
        try {
            choice = Integer.parseInt(keyboard.nextLine());
        } catch (NumberFormatException ex) {
            System.out.println("Invalid Input. Terminating the program");
            exit(-1);
        } catch (Exception ex) {
            System.out.println("Error:\n " + ex.getMessage());
        }


        //Calling appropriate methods based on selection
        switch (choice) {
            case 1:
                PostgresDB postgresDB = new PostgresDB();
                postgresDB.initiateConnection();
                initiateOperations(postgresDB);
                break;
            case 2:
                SalesforceDB salesforceDB = new SalesforceDB();
                salesforceDB.initiateConnection();
                initiateOperations(salesforceDB);
                break;
        }

    }

    public static void initiateOperations(Object object) {
        JDBCUtil jdbcUtil = null;

        if (object instanceof SalesforceDB) {
            jdbcUtil = ((SalesforceDB) object).jdbcUtil;
        } else {
            jdbcUtil = ((PostgresDB) object).jdbcUtil;
        }


        System.out.println("What would you like to do?");
        System.out.println("1. Execute Simple query \n");
        System.out.println("2. List all tables\n");
        System.out.println("3. Show metadata of a table \n");
        Scanner input = new Scanner(System.in);
        int choice = -1;
        try {
            choice = Integer.parseInt(input.nextLine());
        } catch (NumberFormatException ex) {
            System.out.println("Invalid Input. Terminating the program");
            System.exit(-1);
        } catch (Exception ex) {
            System.out.println("Error:\n " + ex.getMessage());
            System.exit(-1);
        }


        switch (choice) {

            case 1:
                jdbcUtil.executeQuery();
                break;
            case 2:
                jdbcUtil.listAllTables();
                break;
            case 3:
                ArrayList<String> tableList = jdbcUtil.getTablesList();
                for (int i = 0; i < tableList.size(); i++) {
                    System.out.println(i + ". " + tableList.get(i));
                }

                System.out.println("Choose the table you would like to see the metadata for: ");
                Scanner scanner = new Scanner(System.in);
                int number = -1;

                try {
                    number = Integer.parseInt(scanner.nextLine());
                } catch (Exception ex) {
                    System.out.println("Exception: Terminating the program.." + ex.getMessage());
                }

                if (number < 0 || number > tableList.size()) {
                    System.out.println("Invalid choice.");
                    System.exit(-1);
                }

                jdbcUtil.showTableMetaData(tableList.get(number));
                break;

        }
    }


}