package projekat.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the transport database table.
 * 
 */
@Entity
@NamedQuery(name="Transport.findAll", query="SELECT t FROM Transport t")
public class Transport implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="TRANSPORT_TRANSPORTID_GENERATOR", sequenceName="TRANSPORT_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="TRANSPORT_TRANSPORTID_GENERATOR")
	private Integer transportid;

	@Temporal(TemporalType.DATE)
	private Date datumt;

	private String lokacija;

	//bi-directional many-to-one association to Planproizvodnje
	@JsonIgnore
	@OneToMany(mappedBy="transport")
	private List<Planproizvodnje> planproizvodnjes;

	//bi-directional many-to-one association to Vrstatransporta
	@ManyToOne
	@JoinColumn(name="vrstatransportaid")
	private Vrstatransporta vrstatransporta;

	public Transport() {
	}

	public Integer getTransportid() {
		return this.transportid;
	}

	public void setTransportid(Integer transportid) {
		this.transportid = transportid;
	}

	public Date getDatumt() {
		return this.datumt;
	}

	public void setDatumt(Date datumt) {
		this.datumt = datumt;
	}

	public String getLokacija() {
		return this.lokacija;
	}

	public void setLokacija(String lokacija) {
		this.lokacija = lokacija;
	}

	public List<Planproizvodnje> getPlanproizvodnjes() {
		return this.planproizvodnjes;
	}

	public void setPlanproizvodnjes(List<Planproizvodnje> planproizvodnjes) {
		this.planproizvodnjes = planproizvodnjes;
	}

	public Planproizvodnje addPlanproizvodnje(Planproizvodnje planproizvodnje) {
		getPlanproizvodnjes().add(planproizvodnje);
		planproizvodnje.setTransport(this);

		return planproizvodnje;
	}

	public Planproizvodnje removePlanproizvodnje(Planproizvodnje planproizvodnje) {
		getPlanproizvodnjes().remove(planproizvodnje);
		planproizvodnje.setTransport(null);

		return planproizvodnje;
	}

	public Vrstatransporta getVrstatransporta() {
		return this.vrstatransporta;
	}

	public void setVrstatransporta(Vrstatransporta vrstatransporta) {
		this.vrstatransporta = vrstatransporta;
	}

}