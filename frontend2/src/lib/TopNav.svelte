<TopAppBar bind:this={topAppBar} variant="short" collapsed>
    <Row>
      <Section>
        <IconButton class="material-icons">menu</IconButton>
        <Title>Short</Title>
      </Section>
      <Section align="end" toolbar>
        <IconButton class="material-icons" aria-label="Download"
          >file_download</IconButton
        >
      </Section>
    </Row>
  </TopAppBar>
  <AutoAdjust {topAppBar}>
  
  </AutoAdjust>
  
  <script lang="ts">
    import TopAppBar, {
      Row,
      Section,
      Title,
      AutoAdjust,
    } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
 
  
    let topAppBar: TopAppBar | null = $state(null);
  </script>
  
  <style>
    /* Hide everything above this component. */
    :global(#smui-app),
    :global(body),
    :global(html) {
      display: block !important;
      height: auto !important;
      width: auto !important;
      position: static !important;
    }
  </style>
  