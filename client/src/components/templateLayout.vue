<style scoped>
    .layout{
        background: #f5f7f9;
        position: relative;
        /* border-radius: 4px; */
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        /* box-shadow: 0 1px 1px rgba(0,0,0,.1); */
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #fff;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-logo{
        /* width: 100px; */
        height: 45px;
        position: absolute;
        /* background: #5b6270; */
        /* border-radius: 3px; */
        /* float: left; */
        /* position: relative; */
        /* top: 15px; */
        /* left: 20px; */
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .ivu-layout-sider {
      background: #fff;
      height: 100%;
      position: fixed;
    }
</style>
<template>
<div class="layout">
        <Layout>
            <!-- <Sider style="z-index:3" ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" @mouseleave.native="isCollapsed=true" @mouseover.native="isCollapsed=false">
                <Menu active-name="1-2" theme="light" width="auto" :class="menuitemClasses">
                    <MenuItem name="1">
                      <Icon type="md-document" />
                      <router-link tag="span" to="/posts">see post</router-link>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <Icon type="ios-search"></Icon>
                        <span>Option 2</span>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <Icon type="ios-settings"></Icon>
                        <span>Option 3</span>
                    </MenuItem>
                </Menu>
            </Sider> -->
            <Layout>
                <Header style="position: fixed; width: 100%; z-index:1; background: #fff">
                  <Menu mode="horizontal" theme="light" active-name="1" style="display: flex;align-items: center;justify-content: center;">
                    <div class="layout-logo" align="center">
                      <img src="../../static/logo.png" style="width: auto;height: 45px;" />
                    </div>
                    <div class="layout-nav" style="margin-left: auto;">
                      <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-stats" />
                            {{activeMenu}}
                        </template>
                        <MenuGroup title="social media">
                            <!-- <MenuItem name="3-1" @click.native="setActive('All')">All</MenuItem> -->
                            <MenuItem name="3-2" @click.native="setActive('Twitter')">Twitter</MenuItem>
                            <MenuItem name="3-3" @click.native="setActive('Facebook')">Facebook</MenuItem>
                            <MenuItem name="3-3" @click.native="setActive('Instagram')">Instagram</MenuItem>
                        </MenuGroup>
                    </Submenu>
                      <!-- <MenuItem name="2">
                        <Icon type="ios-keypad"></Icon>
                        Item 2
                      </MenuItem>
                      <MenuItem name="3">
                        <Icon type="ios-analytics"></Icon>
                        Item 3
                      </MenuItem> -->
                    </div>
                  </Menu>
                    <!-- <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon> -->
                </Header>
                <Content :style="{margin: '80px', background: '', minHeight: '260px'}">
                    <!-- <slot :active="activeMenu" /> -->
                    <posts :active="activeMenu" />
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
  import posts from './Posts'

  export default {
    name: 'templateLayout',
    components: {
      posts
    },
    data () {
      return {
        isCollapsed: true,
        activeMenu: 'Twitter',

      }
    },
    computed: {
      rotateIcon () {
        return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
        ];
      },
      menuitemClasses () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    },
    methods: {
      collapsedSider () {
        this.$refs.side1.toggleCollapse();
      },
      test() {
        console.log('test')
      },
      setActive(q) {
        this.activeMenu = q;
        // console.log(this.$route)
        // this.$route.query.s = q;
        // this.$route.push({query: {s:q}})
      }
    }
  }
</script>