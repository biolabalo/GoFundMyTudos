import axios from "axios";
import { toast } from "react-toastify";
import axioz from "../../../axios-instance";

const addCard = async refrence => {
  try {
    const result = await axios.get(
      `https://api.paystack.co/transaction/verify/${refrence}`,
      {
        headers: {
          Authorization:
            "Bearer sk_test_32339a96e3d16058cb85661fb40bf9603cbfce98"
        }
      }
    );

    const {
      data: {
        data: { authorization }
      }
    } = result;

    const dataFromPayStack = {
      authorization_code: authorization.authorization_code,
      card_type: authorization.card_type,
      last_four: authorization.last4,
      exp_month: authorization.exp_month,
      exp_year: authorization.exp_year,
      first_six: authorization.bin,
      card_bank: authorization.bank
    };

    const finalResponse = await axioz.post("/card-details", dataFromPayStack);
    const { data } = finalResponse;

    if (
      data.status === 201 &&
      data.message === "Card details successfully added"
    ) {
      return toast.success("Card succesfully added");
    }
    return toast.error("Failed to add card try again");
  } catch (err) {
    return toast.error("Failed to add card try again");
  }
};

const payWithPaystack = compiledAmount => {
  var handler = window.PaystackPop.setup({
    key: "pk_test_c3b1a4bd70c7c501aa2222ea03648beccbc0c97e",
    email: "customer@email.com",
    amount: compiledAmount ? compiledAmount * 100 : 10000,
    currency: "NGN",
    ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    firstname: "Stephen",
    lastname: "King",
    // label: "Optional string that replaces customer email"
    metadata: {
      custom_fields: [
        {
          display_name: "Mobile Number",
          variable_name: "mobile_number",
          value: "+2348012345678"
        }
      ]
    },
    callback: function(response) {
      if (!response.reference) alert("Failure From paystack");
      return addCard(response.reference);
    },
    onClose: function() {
      alert("window closed");
    }
  });
  handler.openIframe();
};

export default payWithPaystack;
