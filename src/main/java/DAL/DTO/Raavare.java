package DAL.DTO;

public class Raavare {
    private int receptId = 0;
    private String receptNavn = "";

    public Raavare(int receptId, String receptNavn){
        this.receptId = receptId;
        this.receptNavn = receptNavn;
    }

    // getters & setters
    public int getReceptId() {
        return receptId;
    }

    public void setReceptId(int receptId) {
        this.receptId = receptId;
    }

    public String getReceptNavn() {
        return receptNavn;
    }

    public void setReceptNavn(String receptNavn) {
        this.receptNavn = receptNavn;
    }
}
