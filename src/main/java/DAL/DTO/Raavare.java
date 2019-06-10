package DAL.DTO;

public class Raavare {
    private int id = 0;
    private String navn = "";

    public Raavare(){ }

    public Raavare(int receptId, String receptNavn){
        this.id = receptId;
        this.navn = receptNavn;
    }

    // getters & setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNavn() {
        return navn;
    }

    public void setNavn(String navn) {
        this.navn = navn;
    }
}
