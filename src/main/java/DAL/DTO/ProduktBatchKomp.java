package DAL.DTO;

public class ProduktBatchKomp {
    private int produktBatchID, raavareBatchID, brugerID;
    private double tara, netto;

    public ProduktBatchKomp(){}

    public ProduktBatchKomp(int produktBatchID, int raavareBatchID, int brugerID, double tara, double netto){
        this.produktBatchID = produktBatchID;
        this.raavareBatchID = raavareBatchID;
        this.brugerID = brugerID;
        this.tara = tara;
        this.netto = netto;
    }

    public boolean equals(ProduktBatchKomp pBKomp) {
        if(this.produktBatchID == pBKomp.produktBatchID && this.raavareBatchID == pBKomp.raavareBatchID &&
                this.brugerID == pBKomp.brugerID && Double.compare(this.tara, pBKomp.tara) == 0 &&
                Double.compare(this.netto, pBKomp.netto) == 0)
            return true;
        return false;
    }

    public int getBrugerID() {
        return brugerID;
    }

    public double getNetto() {
        return netto;
    }

    public double getTara() {
        return tara;
    }

    public int getProduktBatchID() {
        return produktBatchID;
    }

    public int getRaavareBatchID() {
        return raavareBatchID;
    }

    public void setBrugerID(int brugerID) {
        this.brugerID = brugerID;
    }

    public void setProduktBatchID(int produktBatchID) {
        this.produktBatchID = produktBatchID;
    }

    public void setRaavareBatchID(int raavareBatchID) {
        this.raavareBatchID = raavareBatchID;
    }

    public void setNetto(double netto) {
        this.netto = netto;
    }

    public void setTara(double tara) {
        this.tara = tara;
    }
}
