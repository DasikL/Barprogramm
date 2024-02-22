package amk.Barprogramm;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "produkte")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Produkt {
    @Id
    private ObjectId id;
    private int produktId;
    private String name;
    private int bestand;
    private float preis;
    private boolean aktiv;

    private String bild;


    public Integer getProduktId() {
        return produktId;
    }

    public void setProduktId(int i) {
        this.produktId = i;
    }

    public String getName() {
        return name;
    }

    public Integer getBestand() {
        return bestand;
    }

    public Float getPreis() {
        return preis;
    }

    public Boolean isAktiv() {
        return aktiv;
    }
}
