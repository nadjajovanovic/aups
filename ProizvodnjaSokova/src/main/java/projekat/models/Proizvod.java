package projekat.models;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the proizvod database table.
 * 
 */
@Entity
@NamedQuery(name="Proizvod.findAll", query="SELECT p FROM Proizvod p")
public class Proizvod implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="PROIZVOD_PROIZVODID_GENERATOR", sequenceName="PROIZVOD_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="PROIZVOD_PROIZVODID_GENERATOR")
	private Integer proizvodid;

	private BigDecimal cena;

	private String nazivpr;

	private String vrstapr;

	//bi-directional many-to-one association to Planproizvodnje
	@ManyToOne
	@JoinColumn(name="planproizvodnjeid")
	private Planproizvodnje planproizvodnje;

	public Proizvod() {
	}

	public Integer getProizvodid() {
		return this.proizvodid;
	}

	public void setProizvodid(Integer proizvodid) {
		this.proizvodid = proizvodid;
	}

	public BigDecimal getCena() {
		return this.cena;
	}

	public void setCena(BigDecimal cena) {
		this.cena = cena;
	}

	public String getNazivpr() {
		return this.nazivpr;
	}

	public void setNazivpr(String nazivpr) {
		this.nazivpr = nazivpr;
	}

	public String getVrstapr() {
		return this.vrstapr;
	}

	public void setVrstapr(String vrstapr) {
		this.vrstapr = vrstapr;
	}

	public Planproizvodnje getPlanproizvodnje() {
		return this.planproizvodnje;
	}

	public void setPlanproizvodnje(Planproizvodnje planproizvodnje) {
		this.planproizvodnje = planproizvodnje;
	}

}