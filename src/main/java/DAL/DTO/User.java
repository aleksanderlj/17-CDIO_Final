package DAL.DTO;

public class User {
    private int brugerId;
    private String brugerNavn, ini, cpr;
    private boolean aktiv;

    public User(int brugerId, String brugerNavn, String ini, String cpr, boolean aktiv){
        this.brugerId = brugerId;
        this.brugerNavn = brugerNavn;
        this.ini = ini;
        this.cpr = cpr;
        this.aktiv = aktiv;
    }

    public int getBrugerId() {
        return brugerId;
    }

    public void setBrugerId(int brugerId) {
        this.brugerId = brugerId;
    }

    public String getBrugerNavn() {
        return brugerNavn;
    }

    public void setBrugerNavn(String brugerNavn) {
        this.brugerNavn = brugerNavn;
    }

    public String getIni() {
        return ini;
    }

    public void setIni(String ini) {
        this.ini = ini;
    }

    public String getCpr() {
        return cpr;
    }

    public void setCpr(String cpr) {
        this.cpr = cpr;
    }

    public boolean isAktiv(){
        return aktiv;
    }

    public void setAktiv(boolean aktiv) {
        this.aktiv = aktiv;
    }
}
