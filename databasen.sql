USE s185103;
drop table raavare;
CREATE TABLE raavare(
		raavareID INT PRIMARY KEY, 
		raavareNavn TEXT NOT NULL);

CREATE TABLE recept(
		receptID INT PRIMARY KEY, 
        receptNavn TEXT NOT NULL);
        
CREATE TABLE receptKomp(
		receptID INT,
        raavareID INT,
        nonNetto DOUBLE(7,4),
        tolerance DOUBLE(3,1),
        FOREIGN KEY (receptID) REFERENCES recept(receptID),
        FOREIGN KEY (raavareID) REFERENCES raavare(raavareID));
        
CREATE TABLE raavareBatch(
		raavareBatchID INT PRIMARY KEY, 
		raavareID INT, 
		maengde DOUBLE(7,4),
		leverandoer TEXT,
		FOREIGN KEY (raavareID) REFERENCES raavare(raavareID));
        
CREATE TABLE produktBatch(
		produktBatchID INT PRIMARY KEY AUTO_INCREMENT, 
		receptID INT, 
        batchStatus INT NOT NULL,
        opstartDato TEXT NOT NULL,
        slutDato TEXT,
        FOREIGN KEY (receptID) REFERENCES recept(receptID));
        
drop table produktBatchKomp, produktBatch, raavareBatch, receptKomp;

CREATE TABLE produktBatchKomp(
		produktBatchID INT,
        raavareBatchID INT,
        tara DOUBLE(7,4), 
        netto DOUBLE(7,4),
        brugerID INT,
        FOREIGN KEY (produktBatchID) REFERENCES produktBatch(produktBatchID),
        FOREIGN KEY (raavareBatchID) REFERENCES raavareBatch(raavareBatchID),
        FOREIGN KEY (brugerID) REFERENCES bruger(brugerID));

CREATE TABLE bruger(
		brugerID INT PRIMARY KEY,
        brugerNavn TEXT,
        ini TEXT,
        cpr TEXT,
        aktiv BOOLEAN);
        
insert into bruger set brugerID = 1, brugerNavn = "Simon", ini ="SH", cpr = "100496", aktiv = true;
insert into bruger set brugerID = 2, brugerNavn = "Silas", ini ="SJ", cpr = "241097", aktiv = true;
insert into bruger set brugerID = 3, brugerNavn = "Peter", ini ="PH", cpr = "150700", aktiv = true;