import { shallowMount, mount, config } from "@vue/test-utils";
import App from "../../src/App.vue";
import router from "../../src/router";
import SideBar from "@/components/SideBar.vue";
import { createPinia } from 'pinia';

config.global.stubs['RouterLink'] = false;
config.global.stubs['RouterView'] = false;
const pinia = createPinia();

describe("App.vue", () => {
  //* actions
  it("Inital Home", () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [router, pinia],
      },
    });
    const h1 = wrapper.find("h1");
    if (h1.exists()) {
      expect(h1.text()).toBe("Health dates");
    }
  });


  it("button create cita clicked", async () => {
    const wrapper = mount(SideBar, {
      global: {
        plugins: [router, pinia],
      },
    });

    await router.isReady();

    const links = wrapper.findAll("a").filter((a) => a.text() === "Crear cita");

    if (links.length > 0) {
      const link = links[0];
      await link.trigger("click");
    } else {
      throw new Error("No se encontro el link");
    }
  });
});
