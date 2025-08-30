import styles from '../form.module.css';
import Authentication from "../Authentication";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { USER_BASEURL } from "../../../shared/utils/baseurl"; // make sure this points to Render backend

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${USER_BASEURL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }

            // ✅ Success → redirect to login
            navigate("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const form =
        <form className={styles['wrapper']} onSubmit={handleSubmit}>
            <div className={styles['header']}>
                <div className={styles['title']}>Sign up with your email</div>
                <div className={styles['login']}>Already have an account? <Link to={'/login'}>Login</Link></div>
            </div>
            <div className={styles['form']}>
                <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit" className="btn1" disabled={loading}>
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </form>;

    return <Authentication data={form}/>;
};

export default Signup;
