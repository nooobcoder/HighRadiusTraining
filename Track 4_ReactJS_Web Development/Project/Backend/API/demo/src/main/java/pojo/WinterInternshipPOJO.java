package pojo;

public class WinterInternshipPOJO {
    int sl_no;
    String business_code;
    int cust_number;
    String name_customer;
    String clear_date;
    String business_year;
    String doc_id;
    String posting_date;
    String document_create_date;
    String document_create_date1;
    String due_in_date;
    String invoice_currency;
    String document_type;
    int posting_id;
    String area_business;
    float total_open_amount;
    String baseline_create_date;
    String cust_payment_terms;
    int invoice_id;
    boolean isOpen;
    String aging_bucket;

    public int getSl_no() {
        return sl_no;
    }

    public void setSl_no(int sl_no) {
        this.sl_no = sl_no;
    }

    public String getBusiness_code() {
        return business_code;
    }


    public int getCust_number() {
        return cust_number;
    }


    public String getClear_date() {
        return clear_date;
    }


    public String getBusiness_year() {
        return business_year;
    }


    public String getDoc_id() {
        return doc_id;
    }


    public String getPosting_date() {
        return posting_date;
    }


    public String getDocument_create_date() {
        return document_create_date;
    }


    public String getDocument_create_date1() {
        return document_create_date1;
    }


    public String getDue_in_date() {
        return due_in_date;
    }


    public String getInvoice_currency() {
        return invoice_currency;
    }


    public String getDocument_type() {
        return document_type;
    }


    public int getPosting_id() {
        return posting_id;
    }


    public String getArea_business() {
        return area_business;
    }


    public float getTotal_open_amount() {
        return total_open_amount;
    }


    public String getBaseline_create_date() {
        return baseline_create_date;
    }


    public String getCust_payment_terms() {
        return cust_payment_terms;
    }


    public int getInvoice_id() {
        return invoice_id;
    }


    public boolean getIsOpen() {
        return isOpen;
    }


    public String getAging_bucket() {
        return aging_bucket;
    }


    public String getName_customer() {
        return name_customer;
    }

    public boolean isOpen() {
        return isOpen;
    }

    @Override
    public String toString() {
        return "WinterInternshipPOJO{" +
                "sl_no=" + sl_no +
                ", business_code='" + business_code + '\'' +
                ", cust_number=" + cust_number +
                ", name_customer='" + name_customer + '\'' +
                ", clear_date='" + clear_date + '\'' +
                ", business_year='" + business_year + '\'' +
                ", doc_id='" + doc_id + '\'' +
                ", posting_date='" + posting_date + '\'' +
                ", document_create_date='" + document_create_date + '\'' +
                ", document_create_date1='" + document_create_date1 + '\'' +
                ", due_in_date='" + due_in_date + '\'' +
                ", invoice_currency='" + invoice_currency + '\'' +
                ", document_type='" + document_type + '\'' +
                ", posting_id=" + posting_id +
                ", area_business='" + area_business + '\'' +
                ", total_open_amount=" + total_open_amount +
                ", baseline_create_date='" + baseline_create_date + '\'' +
                ", cust_payment_terms='" + cust_payment_terms + '\'' +
                ", invoice_id=" + invoice_id +
                ", isOpen=" + isOpen +
                ", aging_bucket='" + aging_bucket + '\'' +
                '}';
    }
}
