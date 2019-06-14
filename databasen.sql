USE s185103;
CREATE TABLE raavare(
		raavareID INT PRIMARY KEY, 
		raavareNavn TEXT NOT NULL);

CREATE TABLE recept(
		receptID INT PRIMARY KEY, 
        receptNavn TEXT NOT NULL);
        
CREATE TABLE receptKomp(
		receptID INT,
        raavareID INT,
        nonNetto DOUBLE(7,4) NOT NULL,
        tolerance DOUBLE(3,1) NOT NULL,
        FOREIGN KEY (receptID) REFERENCES recept(receptID),
        FOREIGN KEY (raavareID) REFERENCES raavare(raavareID));

CREATE TABLE raavareBatch(
		raavareBatchID INT PRIMARY KEY, 
		raavareID INT, 
		maengde DOUBLE(7,4) NOT NULL,
		leverandoer TEXT NOT NULL,
		FOREIGN KEY (raavareID) REFERENCES raavare(raavareID),
        CHECK (maengde >= 0));
        
INSERT INTO raavareBatch SET raavareBatchID = 41, raavareID = 1, maengde =123, leverandoer= "hejsa";

CREATE TABLE produktBatch(
		produktBatchID INT PRIMARY KEY AUTO_INCREMENT, 
		receptID INT, 
        batchStatus INT NOT NULL,
        opstartDato TEXT NOT NULL,
        slutDato TEXT,
        FOREIGN KEY (receptID) REFERENCES recept(receptID));
        
CREATE TABLE produktBatchKomp(
		produktBatchID INT,
        raavareBatchID INT,
        tara DOUBLE(7,4) NOT NULL,
        netto DOUBLE(7,4) NOT NULL,
        brugerID INT,
        FOREIGN KEY (produktBatchID) REFERENCES produktBatch(produktBatchID),
        FOREIGN KEY (raavareBatchID) REFERENCES raavareBatch(raavareBatchID),
        FOREIGN KEY (brugerID) REFERENCES bruger(brugerID));

CREATE TABLE bruger(
		brugerID INT PRIMARY KEY,
        brugerNavn TEXT NOT NULL,
        ini TEXT NOT NULL,
        cpr TEXT NOT NULL,
        aktiv BOOLEAN);
       
insert into bruger set brugerID = 1, brugerNavn = "Simon", ini ="SH", cpr = "100496", aktiv = true;
insert into bruger set brugerID = 2, brugerNavn = "Silas", ini ="SJ", cpr = "241097", aktiv = true;
insert into bruger set brugerID = 3, brugerNavn = "Peter", ini ="PH", cpr = "150700", aktiv = true;