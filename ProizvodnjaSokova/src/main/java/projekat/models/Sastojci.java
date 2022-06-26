package projekat.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


/**
 * The persistent class for the sastojci database table.
 * 
 */
@Entity
@NamedQuery(name="Sastojci.findAll", query="SELECT s FROM Sastojci s")
public class Sastojci implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="SASTOJCI_SASTOJCIID_GENERATOR", sequenceName="SASTOJCI_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SASTOJCI_SASTOJCIID_GENERATOR")
	private Integer sastojciid;

	private String nazivs;

	//bi-directional many-to-one association to Skladiste
	/*@JsonIgnore
	@OneToMany(mappedBy="sastojci")
	private List<Skladiste> skladistes;*/

	public Sastojci() {
	}

	public Integer getSastojciid() {
		return this.sastojciid;
	}

	public void setSastojciid(Integer sastojciid) {
		this.sastojciid = sastojciid;
	}

	public String getNazivs() {
		return this.nazivs;
	}

	public void setNazivs(String nazivs) {
		this.nazivs = nazivs;
	}

	/*public List<Skladiste> getSkladistes() {
		return this.skladistes;
	}

	public void setSkladistes(List<Skladiste> skladistes) {
		this.skladistes = skladistes;
	}

	public Skladiste addSkladiste(Skladiste skladiste) {
		getSkladistes().add(skladiste);
		skladiste.setSastojci(this);

		return skladiste;
	}

	public Skladiste removeSkladiste(Skladiste skladiste) {
		getSkladistes().remove(skladiste);
		skladiste.setSastojci(null);

		return skladiste;
	}*/

}