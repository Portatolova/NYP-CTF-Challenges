import javax.crypto.*;
import javax.crypto.spec.*;
import java.security.*;
import java.security.spec.*;
import java.util.Base64;

class ljdkabjsho3Shasf {

    public String alsnciqbn3rf(String s1, String s2, String s3, String s4, String s5) throws NoSuchAlgorithmException, InvalidKeySpecException {

        String[] asolhfn = new String(Base64.getDecoder().decode(s3)).split("-");
        SecretKeyFactory factory = SecretKeyFactory.getInstance(asolhfn[1]);
        char[] NLSaBJKLS = s1.toCharArray();
        KeySpec spec = new PBEKeySpec(NLSaBJKLS, s2.getBytes(), 65536, 256);
        SecretKey mmmm = new SecretKeySpec(factory.generateSecret(spec).getEncoded(), "AES");

        jbcdksnkcal lashdaslk = new jbcdksnkcal();
        IvParameterSpec ashonlfciasdf = lashdaslk.tgcabjsklnjas(s5);

        return new plmalnnxAS091().lsadmlasjijd(s4, mmmm, ashonlfciasdf);
    }
}