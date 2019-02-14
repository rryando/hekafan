<template>
<div class="layout">
  <Layout>
    <Drawer title="some menu" placement="left" :closable="true" v-model="showSidebar">
      <Menu :theme="theme3" active-name="1">
        <MenuGroup title="post">
          <MenuItem name="1" @click.native="showSidebar = false">
              <Icon type="md-document" />
              <router-link to="/posts">see post</router-link>
          </MenuItem>
          <MenuItem name="2">
              <Icon type="md-chatbubbles" />
              coming soon
          </MenuItem>
        </MenuGroup>
      </Menu>
    </Drawer>
    <Header>
      <Menu mode="horizontal" theme="light" active-name="1">
        <div class="layout-logo">
          <Button @click="showSidebar = true" type="default" size="large" icon="ios-apps"></Button>
        </div>
        <div class="layout-nav">
          <MenuItem name="1">
            <Icon type="ios-navigate"></Icon>
            Item 1
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-keypad"></Icon>
            Item 2
          </MenuItem>
          <MenuItem name="3">
            <Icon type="ios-analytics"></Icon>
            Item 3
          </MenuItem>
          <MenuItem name="4">
            <Icon type="ios-paper"></Icon>
            Item 4
          </MenuItem>
        </div>
      </Menu>
    </Header>
    <Breadcrumb style="margin-top:20px;float: left">
      <BreadcrumbItem to="/">Home</BreadcrumbItem>
      <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{margin: '20px 20px 0', background: '#fff', minHeight: '500px'}">
       <slot />
    </Content>
  </Layout>
</div>
</template>
<script>
    export default {
        data () {
            return {
                showSidebar: false
            }
        },
        methods: {
          test() {
            console.log('click')
          }
        }
    }
</script>
<style scoped>
.layout{
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    background: #fff;
    border-radius: 3px;
    float: left;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
.ivu-layout-header {
  background: #fff;
}
.ivu-menu{
  position: static;
}

.ivu-drawer-body{
  padding: 0 !important;
}
.ivu-menu-vertical{
  width: 100%;
}
</style>